const { exec } = require('child_process');
const os = require('os');

const isWin = os.platform() === 'win32';
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

// Start the app
console.log('[INFO] Starting app...');
const startCmd = isWin
  ? 'start /B cmd /C "npm run start:both > nul"'
  : 'npm run start:both > /dev/null &';

exec(startCmd, async (err) => {
  if (err) {
    console.error('[ERROR] Failed to start app:', err);
    process.exit(1);
  }

  console.log('[INFO] App started. Waiting 30 seconds...');
  await wait(30000);

  console.log('[INFO] Running unit tests...');
  exec('npm run test:unit', (unitErr) => {
    if (unitErr) {
      console.error('[ERROR] Unit tests failed.');
      process.exit(1);
    }

    console.log('[INFO] Running Robot tests...');
    exec('npm run test:robot', (robotErr) => {
      if (robotErr) {
        console.error('[ERROR] Robot tests failed.');
        process.exit(1);
      }

      console.log('[INFO] Shutting down app...');
      const killCmd = isWin
        ? 'taskkill /F /IM node.exe > nul'
        : 'pkill -f react-scripts';

      exec(killCmd, () => {
        console.log('[INFO] Done.');
        process.exit(0);
      });
    });
  });
});
