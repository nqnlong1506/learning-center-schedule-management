import {
  Repository,
  QueryRunner,
  DataSource,
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
  FindOperator,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { isObject } from 'lodash';

@Injectable()
export class BaseRepository<T> extends Repository<T> {
  private static mapRunners: Map<string, QueryRunner | undefined> | undefined =
    new Map<string, QueryRunner | undefined>();
  private dataSource: DataSource;

  private static lengthKey: number = 8;

  constructor(
    private repository: Repository<T>,
    dataSource: DataSource,
  ) {
    super(repository.target, dataSource.manager);
    this.dataSource = dataSource;
  }

  private static addRunner(runner: QueryRunner): string {
    const key = this.generateKey();
    if (this.getRunner(key)) {
      return '';
    }

    this.mapRunners.set(key, runner);
    return key;
  }

  private static getRunner(key: string): QueryRunner | undefined {
    if (!this.mapRunners.get(key)) {
      return undefined;
    }

    return this.mapRunners.get(key);
  }

  private static setRunner(
    key: string,
    runner: QueryRunner | undefined,
  ): string {
    if (!runner) {
      this.mapRunners.delete(key);
      return key;
    }

    this.mapRunners.set(key, runner);
    return key;
  }

  private static generateKey(): string {
    let key = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < this.lengthKey) {
      key += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return key;
  }

  static logRunners(): void {
    console.log('BaseRepository.mapRunners.size', this.mapRunners.size);
    console.log('BaseRepository.mapRunners.keys', this.mapRunners.keys());
  }

  /**
   * empty ' ' string will be returned if any error
   * @startTransation
   */
  async startTransaction(): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();

    const add = BaseRepository.addRunner(queryRunner);
    if (add == '') {
      return add;
    }

    const runner = BaseRepository.getRunner(add);
    if (!runner.isTransactionActive) {
      await runner.startTransaction();
    }

    return add;
  }

  async commitTransaction(key: string): Promise<string> {
    const runner = BaseRepository.getRunner(key);

    if (!runner) {
      throw 'QueryRunner does not exist to commit()';
    }

    await runner.commitTransaction();
    await runner.release();

    return BaseRepository.setRunner(key, undefined);
  }

  async rollbackTransaction(key: string): Promise<string> {
    const runner = BaseRepository.getRunner(key);

    if (!runner) {
      throw 'QueryRunner does not exist to rollback()';
    }

    await runner.rollbackTransaction();
    await runner.release();

    return BaseRepository.setRunner(key, undefined);
  }

  async createEntity(entity: DeepPartial<T>, keyRunner?: string): Promise<T> {
    if (keyRunner) {
      const runner = BaseRepository.getRunner(keyRunner);

      if (!runner || runner.isReleased) {
        throw 'QueryRunner is either not initialized or already released. Please start a new transaction.';
      }

      const entityData = await runner.manager.create(
        this.repository.target,
        entity,
      );
      const create = await runner.manager.save(entityData);
      return create;
    }

    const entityData = await this.repository.create(entity);
    const create = await this.repository.save(entityData);
    return create;
  }

  async createEntityBatch(
    entity: DeepPartial<T>[],
    keyRunner?: string,
  ): Promise<T[]> {
    if (keyRunner) {
      const runner = BaseRepository.getRunner(keyRunner);

      if (!runner || runner.isReleased) {
        throw 'QueryRunner is either not initialized or already released. Please start a new transaction.';
      }

      const entityData = await runner.manager.create(
        this.repository.target,
        entity,
      );
      const create = await runner.manager.save(entityData);
      return create;
    }

    const entityData = await this.repository.create(entity);
    const create = await this.repository.save(entityData);
    return create;
  }

  checkSaveWhere(where) {
    try {
      if (
        !where ||
        Object.values(where).some(
          (v) =>
            v === undefined ||
            v === null ||
            (isObject(v) &&
              !(v instanceof FindOperator) &&
              this.checkSaveWhere(v)),
        )
      ) {
        throw new Error(
          'SECURITY WARNING: Invalid update condition - missing WHERE clause',
        );
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async updateEntities(
    where: Record<string, any>,
    updateData: DeepPartial<T>,
    keyRunner?: string,
  ): Promise<T[]> {
    try {
      this.checkSaveWhere(where);
      if (keyRunner) {
        const runner = BaseRepository.getRunner(keyRunner);

        if (!runner || runner.isReleased) {
          throw new Error(
            'QueryRunner is either not initialized or already released. Please start a new transaction.',
          );
        }
        const entities = await runner.manager.find(this.repository.target, {
          where,
        });

        // if (!entities.length) {
        //   throw new Error('No entities found with the specified conditions.');
        // }

        const updatedEntities: T[] = [];
        for (const entity of entities) {
          const updatedEntity = this.repository.merge(entity, updateData);

          const result = await runner.manager.save(
            this.repository.target,
            updatedEntity,
          );

          updatedEntities.push(result);
        }

        return updatedEntities;
      } else {
        const entities = await this.repository.find({ where });
        // if (!entities.length) {
        //   throw new Error('No entities found with the specified conditions.');
        // }

        const updatedEntities: T[] = [];
        for (const entity of entities) {
          const updatedEntity = this.repository.merge(entity, updateData);
          const result = await this.repository.save(updatedEntity);
          updatedEntities.push(result);
        }
        return updatedEntities;
      }
    } catch (error) {
      throw new Error(`Failed to update entities: ${error.message}`);
    }
  }

  async updateEntity(
    where: Record<string, any>,
    updateData: DeepPartial<T>,
    keyRunner?: string,
  ): Promise<T> {
    try {
      this.checkSaveWhere(where);
      if (keyRunner) {
        const runner = BaseRepository.getRunner(keyRunner);
        if (!runner || runner.isReleased) {
          throw new Error(
            'QueryRunner is either not initialized or already released. Please start a new transaction.',
          );
        }
        const entity = await runner.manager.findOne(this.repository.target, {
          where,
        });
        // if (!entity) {
        //   throw new Error('No entity found with the specified conditions.');
        // }
        const updatedEntity = this.repository.merge(entity, updateData);
        return await runner.manager.save(this.repository.target, updatedEntity);
      } else {
        const entity = await this.repository.findOne({ where });
        // if (!entity) {
        //   throw new Error('No entity found with the specified conditions.');
        // }
        const updatedEntity = this.repository.merge(entity, updateData);
        return await this.repository.save(updatedEntity);
      }
    } catch (error: any) {
      throw new Error(`Failed to update entity: ${error.message}`);
    }
  }

  async deleteEntities(
    where: Record<string, any>,
    keyRunner?: string,
  ): Promise<void> {
    try {
      this.checkSaveWhere(where);
      if (keyRunner) {
        const runner = BaseRepository.getRunner(keyRunner);
        if (!runner || runner.isReleased) {
          throw new Error(
            'QueryRunner is either not initialized or already released. Please start a new transaction.',
          );
        }
        const entities = await runner.manager.find(this.repository.target, {
          where,
        });
        // if (!entities.length) {
        //   throw new Error('No entities found with the specified conditions.');
        // }
        for (const entity of entities) {
          await runner.manager.remove(this.repository.target, entity);
        }
      } else {
        const entities = await this.repository.find({ where });
        // if (!entities.length) {
        //   throw new Error('No entities found with the specified conditions.');
        // }
        await this.repository.remove(entities);
      }
    } catch (error: any) {
      throw new Error(`Failed to delete entities: ${error.message}`);
    }
  }

  async getItem(options: FindOneOptions<T>): Promise<T | undefined> {
    const result = await this.repository.findOne(options);

    if (!result) {
      return undefined;
    }

    return result;
  }

  async getItems(
    options?: FindManyOptions<T>,
  ): Promise<ListEntityResutls<T> | undefined> {
    try {
      const results = await this.repository.find(options);

      const list = new ListEntityResutls<T>();
      list.data = results;
      list.totalCount = await this.repository.count(options);
      list.totalPages = Math.ceil(list.totalCount / options.take);

      return list;
    } catch (error) {
      throw error;
    }
  }

  async getItemsWithoutPagination(
    options?: FindManyOptions<T>,
  ): Promise<T[] | undefined> {
    try {
      const results = await this.repository.find(options);

      return results;
    } catch (error) {
      throw error;
    }
  }
}

export class ListEntityResutls<T> {
  public data: T[];
  public totalCount: number;
  public totalPages: number;
}
