import childProcess from "child_process";

export default defineEventHandler((process) => {
  const query = getQuery(process);
  const input = query.url as string;

  if (!input) {
    return "Please provide a valid domain"
  }

  if (input.includes("&" || "|" || ";" || "&&" || "||" || "`" || "$" || "<" || ">" || "(" || ")")) {
    return "You fucked up the command!";
  } else {
    const commandOutput = childProcess.execSync(
      `dig txt +short ${query.url} | grep spf`
    ).toString();

    if (commandOutput === "") {
      return "No SPF record found";
    }

    const cleanedOutput = commandOutput.replace(/^"|"$/g, "").replace(/\\|"|\n/g, "");
    return `${cleanedOutput}`;
  }
});
