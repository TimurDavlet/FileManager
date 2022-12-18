import zlib from 'zlib';
import fs from 'fs';
import { stat } from 'node:fs/promises';
import { checkTwoArg } from './helpers.js';
import path from 'path';

export const compress = async (currentDir, args) => {
    checkTwoArg(args);
    try {
        const startPath = currentDir.length === 1 && currentDir[0] === '' ? '/' : currentDir.join(path.sep);
        const newPathIn = path.resolve(startPath, args[0]);
        const newPathOut = path.resolve(startPath, `${args[1]}.br`);
    
        const stats = await stat(newPathIn);
        if (stats) {
            const readable = fs.createReadStream(newPathIn);
            const writeble = fs.createWriteStream(newPathOut);

            const brotli = zlib.createBrotliCompress();
            readable.pipe(brotli).pipe(writeble);
            return;
        }
    return;
    } catch(_e) {
        throw 'Operation failed';
    }
};

export const decompress = async (currentDir, args) => {
    checkTwoArg(args);
    try {
        const startPath = currentDir.length === 1 && currentDir[0] === '' ? '/' : currentDir.join(path.sep);
        const newPathIn = path.resolve(startPath, args[0]);
        const newPathOut = path.resolve(startPath, args[1]);
    
        const stats = await stat(newPathIn);
        if (stats) {
            const readable = fs.createReadStream(newPathIn);
            const writeble = fs.createWriteStream(newPathOut);

            const brotli = zlib.createBrotliDecompress();
            readable.pipe(brotli).pipe(writeble);
            return;
        }
    return;
    } catch(_e) {
        throw 'Operation failed';
    }
};
