import fs from 'fs';
import path from 'path';
import { writeFile, rename, rm, stat } from 'node:fs/promises';
import { checkOneArg, checkTwoArg } from './helpers.js';
import { pipeline } from "stream/promises";


export const cat = async (currentDir, args) => {
    checkOneArg(args);
    try {
        const startPath = currentDir.length === 1 && currentDir[0] === '' ? '/' : currentDir.join(path.sep);
        const newPath = path.resolve(startPath, args[0]);
        const readable = fs.createReadStream(newPath);
        
        await (async () => {
        for await (const chunk of readable) {
            process.stdout.write(chunk.toString());
        }
        })();
        console.log('\n');
        return;
    } catch(_e) {
        throw 'Operation failed';
    }
}

export const add = async (currentDir, args) => {
    checkOneArg(args);
    try {
        const startPath = currentDir.length === 1 && currentDir[0] === '' ? '/' : currentDir.join(path.sep);
        const newPath = path.resolve(startPath, args[0]);
        await writeFile(newPath, '');
        return;
    } catch(_e) {
        throw 'Operation failed';
    }
};

export const rn = async (currentDir, args) => {
    checkTwoArg(args);
    try {
        const startPath = currentDir.length === 1 && currentDir[0] === '' ? '/' : currentDir.join(path.sep);
        const oldName = path.resolve(startPath, args[0]);
        const newName = path.resolve(startPath, args[1]);
        await rename(oldName, newName);
        return;
    } catch(_e) {
        throw 'Operation failed';
    }
};

export const cp = async (currentDir, args) => {
    checkTwoArg(args);
    try {
        const startPath = currentDir.length === 1 && currentDir[0] === '' ? '/' : currentDir.join(path.sep);
        const oldPath = path.resolve(startPath, args[0]);
        const newPath = path.resolve(startPath, args[1]);
        const stats = await stat(oldPath);
        if (stats) {
            const readable = fs.createReadStream(oldPath);
            const writeble = fs.createWriteStream(newPath);

            await pipeline(
                readable,
                writeble
            );
        }
        return;
    } catch(_e) {
        throw 'Operation failed';
    }
}

export const mv = async (currentDir, args) => {
    checkTwoArg(args);
    try {
        const startPath = currentDir.length === 1 && currentDir[0] === '' ? '/' : currentDir.join(path.sep);
        const oldPath = path.resolve(startPath, args[0]);
        const newPath = path.resolve(startPath, args[1]);
        const stats = await stat(oldPath);
        if (stats) {
            const readable = fs.createReadStream(oldPath);
            const writeble = fs.createWriteStream(newPath);

            await pipeline(
                readable,
                writeble
            );
        }
        await rm(oldPath);
        return;
    } catch(_e) {
        throw 'Operation failed';
    }
}

export const del = async (currentDir, args) => {
    checkOneArg(args);
    try {
        const startPath = currentDir.length === 1 && currentDir[0] === '' ? '/' : currentDir.join(path.sep);
        const newPath = path.resolve(startPath, args[0]);
        await rm(newPath);
        return;
    } catch(_e) {
        throw 'Operation failed';
    }
}
