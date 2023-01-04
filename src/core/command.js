import { ls } from './navigateOperation.js';
import { cat, add, rn, cp, mv, del } from './filesOperation.js';
import { compress, decompress } from './compressAndDecompress.js';
import calculateHash from './hashCalculation.js';
import os from './operationSystem.js';

export default async (currentDir, commandName, args, usernName) => {
    const [arg1, arg2] = args;
    switch (commandName) {
        case 'up':
            null;
        break;
        case 'cd':
            null;
        break;
        case 'ls':
            return ls(currentDir, args);
        case 'cat':
            return cat(currentDir, args);
        case 'add':
            return add(currentDir, args);
        case 'rn':
            return rn(currentDir, args);
        case 'cp':
            return cp(currentDir, args);
        case 'mv':
            return mv(currentDir, args);
        case 'rm':
            return del(currentDir, args);
        case 'os':
            return os(args);
        case 'hash':
            return calculateHash(currentDir, args);
        case 'compress':
            return compress(currentDir, args);
        case 'decompress':
            return decompress(currentDir, args);
        case '.exit':
            console.log(`\n Thank you for using File Manager, ${usernName}, goodbye!`);
            process.exit();
    }
};
