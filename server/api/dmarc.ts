import childProcess from "child_process";

export default defineEventHandler((process) => {
  const query = getQuery(process);
  const commandOutput = childProcess
    .execSync(`dig txt +short _dmarc.${query.url}`)
    .toString();

  if (commandOutput === "") {
    return "No DMARC record found";
  }

  const cleanedOutput = commandOutput
    .replace(/^"|"$/g, "")
    .replace(/\\|"|\n/g, "");

  return `${cleanedOutput}`;
});
