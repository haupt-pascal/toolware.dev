import childProcess from "child_process";

export default defineEventHandler(async (process) => {
    const query = getQuery(process);
    const input = query.url as string;

    if (input.includes("&" || "|" || ";" || "&&" || "||" || "`" || "$" || "<" || ">" || "(" || ")")) {
        return "You fucked up the command!";
    } else {
        const commandOutput = childProcess
            .execSync(`traceroute ${query.url}`)
            .toString();

        if (commandOutput === "") {
            return "No traceroute record found";
        }

        const lines = commandOutput.split('\n');

        return lines;
    }
});