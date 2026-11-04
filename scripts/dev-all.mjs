// Runs the site and the contact form's mail server together: npm run dev:all
// (the form needs the server in server/ running to send messages).
import { spawn } from 'node:child_process';

const run = (name, cmd, args, cwd) => {
  const child = spawn(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
  child.on('exit', (code) => {
    console.log(`${name} stopped (${code ?? 'signal'})`);
    process.exit(code ?? 0);
  });
  return child;
};

const children = [run('mail server', 'npm', ['run', 'dev'], 'server'), run('site', 'npx', ['vite'], '.')];
const stop = () => children.forEach((c) => c.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
