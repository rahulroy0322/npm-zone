import pkg from "../../package.json";

const showHelp = () => {
  console.log(`
<setup> : ${pkg.version}
📋 npm zone setup - Available Commands:
        
    help          Show help message
    project ts|js Setup a new project
💡 Examples:
  setup project ts first-project  #creates new project called first-project
  setup project ts #ask for project name
`);
};

export { showHelp };
