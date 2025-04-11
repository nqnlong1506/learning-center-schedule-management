import { Repository, QueryRunner, DataSource, FindOneOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';

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

  async createEntity(entity: T, keyRunner?: string): Promise<T> {
    if (keyRunner) {
      const runner = BaseRepository.getRunner(keyRunner);

      if (!runner || runner.isReleased) {
        throw 'QueryRunner is either not initialized or already released. Please start a new transaction.';
      }

      const create = await runner.manager.save(entity);
      return create;
    }

    const create = await this.repository.save(entity);
    return create;
  }

  async updateEntity(entity: T, keyRunner?: string): Promise<T> {
    if (keyRunner) {
      const runner = BaseRepository.getRunner(keyRunner);

      if (!runner || runner.isReleased) {
        throw 'QueryRunner is either not initialized or already released. Please start a new transaction.';
      }

      const update = await runner.manager.save(entity);
      return update;
    }

    const update = await this.repository.save(entity);
    return update;
  }

  async getItem(options: FindOneOptions<T>): Promise<T | undefined> {
    const result = await this.repository.findOne(options);

    if (!result) {
      return undefined;
    }

    return result;
  }
}
