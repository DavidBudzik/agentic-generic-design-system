import type { CLICommand } from './types.js';
import { initCommand } from './commands/init.js';
import { componentCommand } from './commands/component.js';
import { templateCommand } from './commands/template.js';
import { docsCommand } from './commands/docs.js';

const commands: CLICommand[] = [
 initCommand,
 componentCommand,
 templateCommand,
 docsCommand,
];

function parseArgs(argv: string[]): { args: string[]; options: Record<string, string | boolean> } {
 const args: string[] = [];
 const options: Record<string, string | boolean> = {};
 for (let i = 0; i < argv.length; i++) {
  const arg = argv[i];
  if (arg.startsWith('--')) {
   const key = arg.slice(2);
   const next = argv[i + 1];
   if (next && !next.startsWith('--')) {
    options[key] = next;
    i++;
   } else {
    options[key] = true;
   }
  } else if (arg.startsWith('-') && arg.length === 2) {
   const key = arg.slice(1);
   const next = argv[i + 1];
   if (next && !next.startsWith('-')) {
    options[key] = next;
    i++;
   } else {
    options[key] = true;
   }
  } else {
   args.push(arg);
  }
 }
 return { args, options };
}

function printHelp(): void {
 console.log(`
 Usage: gds <command> [options]

 Commands:
${commands.map(c => `  ${c.name.padEnd(16)} ${c.description}`).join('\n')}

 Options:
  --help, -h    Show help
  --version, -v  Show version

 Examples:
  gds init --features agents
  gds component --list
  gds component Button
  gds template --list
  gds template dashboard --skeleton
  gds docs theme
 `);
}

export function runCLI(argv: string[]): void {
 const { args, options } = parseArgs(argv);

 if (options.help || options.h) {
  printHelp();
  return;
 }

 if (options.version || options.v) {
  console.log('gds v0.1.0');
  return;
 }

 if (args.length === 0) {
  printHelp();
  return;
 }

 const commandName = args[0];
 const command = commands.find(c => c.name === commandName);

 if (!command) {
  console.error(`Unknown command: ${commandName}`);
  console.log('Run `gds --help` for available commands.');
  process.exit(1);
 }

 command.run(args.slice(1), options);
}