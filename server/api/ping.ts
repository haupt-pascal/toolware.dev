import childProcess from 'child_process';

export default defineEventHandler(async (process) => {
    const query = getQuery(process);
    const input = query.url as string;

    if (!input) {
        return "Please provide a URL";
    }

    if (input.includes("&" || "|" || ";" || "&&" || "||" || "`" || "$" || "<" || ">" || "(" || ")")) {
        return "You fucked up the command!";
    } else {
        const commandOutput = childProcess.execSync(`ping -c 5 ${query.url}`).toString();
    
        if (commandOutput === "") {
            return "No ping record found";
        }

        const lines = commandOutput.split('\n');

        return lines;
    }
});
