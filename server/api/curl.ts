import childProcess from 'child_process';

export default defineEventHandler(process => {
  const query = getQuery(process);
  const commandOutput = childProcess.execSync(`curl -v -L ${query.url} 2>&1 | egrep "^> (Host:)"`).toString();

  let redirectsCount = 0;
  let lastRedirect = null;
  let isFirstHost = true;

  const outputLines = commandOutput.split('\n');
  outputLines.forEach(line => {
    if (line.trim().startsWith('> Host:')) {
      if (!isFirstHost) {
        redirectsCount++;
        lastRedirect = line.trim().split(': ')[1]; // Aktualisiere das letzte Ziel des Redirects
      } else {
        isFirstHost = false;
      }
    }
  });

  return `Number of redirects: ${redirectsCount}, Last redirect target: ${lastRedirect}`;
});
