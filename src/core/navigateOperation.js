import path from 'path';
import { readdir, stat } from 'node:fs/promises';
import { checkNotArg, checkOneArg } from './helpers.js';

const sortArrFiles = (a, b) => {
    const name1 = a.Name.toLowerCase();
    const name2 = b.Name.toLowerCase();
    if (name1 < name2) {
        return -1;
    }
    if (name1 > name2) {
        return 1;
    }
    return 0;
};

export const up = (currentDir, args) => {
    checkNotArg(args);
    if (currentDir.length > 1) {
        const endElement = currentDir[currentDir.length - 1];
        return currentDir.filter(e => e != endElement);
    }
    return currentDir;
}

export const cd = async (currentDir, args) => {
    checkOneArg(args);
    try {
        let startPath = '';
        if (currentDir.length === 1) {
            if (currentDir[0] === '') {
                startPath = '/';
            } else {
                startPath = `C:\\`;
            }
        } else {
            startPath = currentDir.join(path.sep);
        }
        const newPath = path.resolve(startPath, args[0]);
        const stats = await stat(newPath);
        const isFile = stats.isFile();
        if (!isFile) {
            return newPath.split(path.sep);
        } else {
            throw 'Operation failed';
        }
    } catch(_e) {
        throw 'Operation failed';
    }
}

export const ls = async (currentDir, args) => {
    try {
        checkNotArg(args);
        const dir = currentDir.length === 1 && currentDir[0] === '' ? '/' : currentDir.join(path.sep);
        console.log(dir)
        const files = await readdir(dir);
        const deletePrivateFiles = files.filter(el => el.slice(0, 1) !== '.');
        console.log(files)
        const tableList = await deletePrivateFiles.reduce(async (acc, element) => {
            const accum = await acc;
            const path = `${dir}/${element}`;
            const stats = await stat(path);
            const isFile = stats.isFile();
            const type = isFile ? 'File' : 'Directory';
            return acc = [...accum, {Name: element, Type: type}];
        }, Promise.resolve([]));
        const onlyFiles = tableList.filter(el => el.Type == 'File').sort(sortArrFiles);
        const onlyDir = tableList.filter(el => el.Type === 'Directory').sort(sortArrFiles);
        const result = [...onlyDir, ...onlyFiles];
        console.table(result);
      } catch (err) {
        console.error(err);
      }
}

export const currentDirReturn = (currentDir) => {
    if (currentDir.length === 1) {
        return currentDir[0] === '' ? '/' : currentDir.join(path.sep);
    }
    return currentDir.join(path.sep);
}