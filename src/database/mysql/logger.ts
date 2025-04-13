import * as fs from 'fs';
import * as path from 'path';
import { Logger as TypeORMLogger } from 'typeorm';

export class Logger implements TypeORMLogger {
  private static lastQuery: string = '';

  public getLastQuery() {
    return Logger.lastQuery;
  }

  private get currentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  private get logFile() {
    const today = new Date().toISOString().split('T')[0];
    const logDir = path.join(process.cwd(), 'logs', today);
    console.log(logDir);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    return path.join(logDir, 'typeorm.log');
  }

  private formatQuery(query: string, parameters?: any[]): string {
    if (!parameters || parameters.length === 0) return query;

    parameters.forEach((param) => {
      let value;

      if (typeof param === 'boolean') {
        value = param ? 'true' : 'false';
      } else if (typeof param === 'number') {
        value = `${param.toString()}`;
      } else if (typeof param === 'string') {
        value = `'${param}'`;
      } else {
        value = param;
      }

      query = query.replace(
        '?',
        value && value !== undefined ? value.toString() : 'null',
      );
    });
    return query;
  }

  logQuery(query: string, parameters?: any[]) {
    Logger.lastQuery = this.formatQuery(query, parameters);
    const log = `[${this.currentTime}]: ${Logger.lastQuery}\n`;
    fs.appendFileSync(this.logFile, log);
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    Logger.lastQuery = this.formatQuery(query, parameters);
    const log = `[${this.currentTime}]Error: ${error}, Query: ${Logger.lastQuery}\n`;
    fs.appendFileSync(this.logFile, log);
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    Logger.lastQuery = this.formatQuery(query, parameters);
    const log = `[${this.currentTime}]Slow (${time} ms): ${Logger.lastQuery}\n`;
    fs.appendFileSync(this.logFile, log);
  }

  logSchemaBuild(message: string) {
    const log = `[${this.currentTime}] Schema Build: ${message}\n`;
    fs.appendFileSync(this.logFile, log);
  }

  logMigration(message: string) {
    const log = `[${this.currentTime}] Migration: ${message}\n`;
    fs.appendFileSync(this.logFile, log);
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    const log = `${level.toUpperCase()}: ${message}\n`;
    fs.appendFileSync(this.logFile, log);
  }
  logTrade(data: string) {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const logDir = path.join(process.cwd(), 'logs', 'trade');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path.join(logDir, `${today}.log`);
    const log = `[${this.currentTime}] : ${data}\n`;
    fs.appendFileSync(logFile, log);
  }

  logTradePre(pathLog: string, data: string) {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const logDir = path.join(
      process.cwd(),
      'logs',
      'trade',
      'pre',
      `${pathLog}`,
    );
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path.join(logDir, `${today}.log`);
    const log = `[${this.currentTime}] : ${data}\n`;
    fs.appendFileSync(logFile, log);
  }

  logTradePath(pathLog: string, data: string) {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const logDir = path.join(process.cwd(), 'logs', 'trade', `${pathLog}`);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path.join(logDir, `${today}.log`);
    const log = `[${this.currentTime}] : ${data}\n`;
    fs.appendFileSync(logFile, log);
  }
  logHomepagePre(pathLog: string, data: string) {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const logDir = path.join(
      process.cwd(),
      'logs',
      'homepage',
      'pre',
      `${pathLog}`,
    );
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path.join(logDir, `${today}.log`);
    const log = `[${this.currentTime}] : ${data}\n`;
    fs.appendFileSync(logFile, log);
  }
}
