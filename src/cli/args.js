export default () => {
    let nodePath = process.argv[0];
    let appPath = process.argv[1];
    let name = process.argv[2];

    return name === undefined ||  name.length < 12 ? 'anonim' : name.slice(11);
};