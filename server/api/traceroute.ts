import childProcess from "child_process";

export default defineEventHandler(async (process) => {
    const query = getQuery(process);
    console.log(query);
    const commandOutput = childProcess
        .execSync(`traceroute ${query.url}`)
        .toString();

    if (commandOutput === "") {
        return "No traceroute record found";
    }

    const lines = commandOutput.split('\n');

    return lines;
});