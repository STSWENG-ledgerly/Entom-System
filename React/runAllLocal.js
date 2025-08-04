const { spawn, execSync } = require('child_process');
const os = require('os');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const isWindows = os.platform() === 'win32';

  console.log('[INFO] Starting app...');

  const startCommand = isWindows
    ? 'npm run start:both'
    : 'npm run start:both';

  // Start app as detached
  const appProcess = spawn(startCommand, {
    shell: true,
    detached: true,
    stdio: 'ignore'
  });

  appProcess.unref();

  // Wait for app to be ready
  console.log('[INFO] Waiting 30 seconds for app to be ready...');
  await sleep(30_000); // wait 30 seconds

  try {
    console.log('[INFO] Running unit tests...');
    execSync('npm run test:unit', { stdio: 'inherit' });

    console.log('[INFO] Running robot tests...');
    execSync('npm run test:robot', { stdio: 'inherit' });
  } catch (err) {
    console.error('[ERROR] Tests failed:', err);
  } finally {
    console.log('[INFO] Killing app process...');
    try {
      if (isWindows) {
        execSync('taskkill /F /IM node.exe >nul 2>&1');
      } else {
        execSync('pkill -f "react-scripts start" || pkill -f "node server.js" || true');
      }
    } catch (killErr) {
      console.warn('[WARN] Failed to kill app:', killErr.message);
    }
  }
}

main();
