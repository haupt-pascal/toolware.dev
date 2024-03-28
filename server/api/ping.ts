import childProcess from 'child_process';

export default defineEventHandler(async (process) => {
    const query = getQuery(process);
    const commandOutput = childProcess.execSync(`ping -c 5 ${query.url}`).toString();
    // prevent command injection

    if (commandOutput.includes("&" || "|" || ";" || "&&" || "||" || "`" || "$" || "<" || ">" || "(" || ")")) {
        return "You fucked up the command!";
    }


    if (commandOutput === "") {
        return "No ping record found";
    }

    const lines = commandOutput.split('\n');

    return lines;
});
