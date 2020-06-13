function logParamsToJson() {
  const consoleObject = {};

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i].split('=');

    consoleObject[arg[0]] = arg[1] ? arg[1] : true;

    if (consoleObject[arg[0]] === 'false') consoleObject[arg[0]] = false;
    if (consoleObject[arg[0]] === 'true') consoleObject[arg[0]] = true;
  }

  return consoleObject;
}

console.log(logParamsToJson());