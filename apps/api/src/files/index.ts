import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { readFileSync, statSync, readdirSync } from 'fs';
import { resolve } from 'path';
import dayjs from 'dayjs';
import numeral from 'numeral';

import { FileStatsCache } from '../utils/cache';

// TODO: Env var
const rootFilePath =
  '/Users/christopher.caldwell/Code/trials/data-cache-test/.next/cache/fetch-cache';
// const rootFilePath = resolve(process.cwd(), 'temp');

export const seedCache = () => {
  const filesInRoot = readdirSync(rootFilePath);
  filesInRoot.forEach((filename) => {
    const targetFilePath = resolve(rootFilePath, filename);
    const fileContents = readFileSync(targetFilePath, 'utf-8');
    const fileJson = JSON.parse(fileContents);
    console.log('fileJson', fileJson);
    const stats = statSync(targetFilePath);
    FileStatsCache.set(
      filename,
      filename +
        ' - ' +
        numeral(stats.size).format('0.0b') +
        ' - ' +
        dayjs(stats.mtime).format('YYYY-MM-DD HH:mm:ss')
    );
  });
};
