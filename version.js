const [, version] = (/^Release\s+(\d+\.\d+\.\d+[a-z0-9-]*)/ig).exec(process.argv[2]) || Array(2).fill('');

console.log(version);
