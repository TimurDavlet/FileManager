import os from 'os';
import { checkOneArgOs } from './helpers.js';

const getEol = () => {
    console.log(JSON.stringify(os.EOL));
    return;
};

const getCpus = async () => {
    const promise = new Promise((resolve) => resolve());
    promise.then(() => {
        const cpus = os.cpus();
        console.log(`Total CPU: ${cpus.length}`);
        const modelCpu = cpus.map(el => ({ Model: el.model }));
        console.table(modelCpu);
    })
    return;
}

export default async (args) => {
    try {
        checkOneArgOs(args);
        switch (args[0]) {
            case '--EOL':
                return getEol();
            case '--cpus':
                return await getCpus();
            case '--homedir':
                console.log(os.homedir());
                return;
            case '--username':
                console.log(os.userInfo().username);
                return;
            case '--architecture':
                console.log(os.arch());
                return;
        }
    } catch(e) {
        throw e;
    }
}
