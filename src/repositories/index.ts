import {verbose} from 'sqlite3';
import * as path from 'path';

const sqlite3 = verbose();
const dbPath = path.resolve('chinook.db');

export const database = new sqlite3.Database(dbPath);
