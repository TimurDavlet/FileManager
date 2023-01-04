import { up, cd } from './navigateOperation.js';

const availableCommands = [
    'up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv',
     'rm', 'os', 'hash', 'compress', 'decompress', '.exit',
];

export const isCommand = (name) => availableCommands.includes(name);

export const setDir = async (currentDir, command, args) => {
    switch (command) {
        case 'up':
            return up(currentDir, args);
        case 'cd':
            return cd(currentDir, args)
        default:
            return null;
    }
}

export const checkNotArg = (args) => {
    if (args.length > 0) {
        throw 'Invalid input';
    }
    return;
}

export const checkOneArg = (args) => {
    if (args.length === 0 || args.length > 1) {
        throw 'Invalid input';
    }
    return;
}

export const checkTwoArg = (args) => {
    if (args.length !== 2) {
        throw 'Invalid input';
    }
    return;
}

export const checkOneArgOs = (args) => {
    if (args.length === 0 || args.length > 1) {
        throw 'Invalid input';
    }
    if (!['--architecture', '--username', '--homedir', '--cpus', '--EOL'].includes(args[0])) {
        throw 'Invalid input';
    }
    return;
}
