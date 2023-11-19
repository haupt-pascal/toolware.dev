import childProcess from "child_process";

export default defineEventHandler((process) => {
  const query = getQuery(process);
  const commandOutput = childProcess.execSync(
    `dig txt +short ${query.url} | grep spf`
  ).toString();

  const cleanedOutput = commandOutput.replace(/^"|"$/g, "").replace(/\\|"|\n/g, "");
  return `${cleanedOutput}`;
});
