export interface CLICommand {
 name: string;
 description: string;
 usage: string;
 args?: { name: string; description: string; required?: boolean }[];
 options?: { name: string; description: string; alias?: string }[];
 run: (args: string[], options: Record<string, string | boolean>) => void;
}