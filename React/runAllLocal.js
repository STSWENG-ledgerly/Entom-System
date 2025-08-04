const { spawn, execSync } = require('child_process');
const os = require('os');

console.log('[INFO] Starting app...');

const isWindows = os.platform() === 'win32';
const startCommand = isWindows
  ? 'npm run start:both'
  : 'npm run start:both';

// Start the app in background
const appProcess = spawn(startCommand, {
  shell: true,
  detached: true,
  stdio: 'ignore'
});

appProcess.unref();

console.log('[INFO] Waiting 30 seconds for app to be ready...');
execSync(isWindows ? 'timeout 30' : 'sleep 30');

try {
  console.log('[INFO] Running unit tests...');
  execSync('npm run test:unit', { stdio: 'inherit' });

  console.log('[INFO] Running robot tests...');
  execSync('npm run test:robot', { stdio: 'inherit' });
} catch (error) {
  console.error('[ERROR] Tests failed:', error);
} finally {
  console.log('[INFO] Killing app process...');
  if (isWindows) {
    execSync('taskkill /F /IM node.exe');
  } else {
    execSync('pkill -f "react-scripts start" || pkill -f "node server.js" || true');
  }
}
