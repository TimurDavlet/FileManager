import crypto from 'crypto';
import { readFile } from 'node:fs/promises';
import { checkOneArg } from './helpers.js';
import path from 'path';

export default async (currentDir, args) => {
    checkOneArg(args);
    try {
        const startPath = currentDir.length === 1 && currentDir[0] === '' ? '/' : currentDir.join(path.sep);
        const newPath = path.resolve(startPath, args[0]);
        const fileBuffer = await readFile(newPath);
        const hash = crypto.createHash('sha256');
        const hex = hash.update(fileBuffer).digest('hex');
        console.log(hex);
        return;
    } catch(_e) {
        throw 'Operation failed';
    }
};