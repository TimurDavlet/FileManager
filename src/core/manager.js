import parseArgs from '../cli/args.js';
import runCommand from './command.js';
import { isCommand, setDir }  from './helpers.js';
import { currentDirReturn } from './navigateOperation.js'
import os from 'os';
import path from 'path';

const readableFromTerminal = process.stdin;
const homeDir = os.homedir();

const manager = async () => {

    let currentDir = homeDir.split(path.sep);

    const usernName = parseArgs();
    console.log(`Welcome to the File Manager, ${usernName}`);
    console.log(`You are currently in ${currentDir.join(path.sep)}`);
    readableFromTerminal.on('data', async (chunk) => {
        const arr = chunk.toString().trim().split(' ');
        const [command, ...args] = arr;
        if (isCommand(command)) {
            try {
                const newCurrentDir = await setDir(currentDir, command, args);
                currentDir = newCurrentDir !== null ? newCurrentDir : currentDir;
                await runCommand(currentDir, command, args, usernName)
                    .then((data) => data)
                    .then((_data) => console.log(`You are currently in ${currentDirReturn(currentDir)}`));
            } catch(e) {
                console.log(e);
                console.log(`You are currently in ${currentDir.join(path.sep)}`);
            }
        } else {
            console.log('Invalid input');
            console.log(`You are currently in ${currentDirReturn(currentDir)}`);
        }
    });

    process.on('SIGINT', function() {
        console.log(`\n Thank you for using File Manager, ${usernName}, goodbye!`);
        process.exit();
    });
};

export default manager;
