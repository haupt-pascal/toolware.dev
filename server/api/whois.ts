import childProcess from "child_process";

export default defineEventHandler((process) => {
    const query = getQuery(process);
    const commandOutput = childProcess
        .execSync(`whois ${query.url} | grep -E "^(Name Server|Domain Name|Registrant Name|Registrant Street|Registrant City|Registrant Phone|Registrant Email|Tech Name|Tech Street|Tech City|Tech Phone|Tech Email|Admin Name|Admin Street|Admin City|Admin Phone|Admin Email)"`)
        .toString();

    if (commandOutput === "") {
        return "No WHOIS record found";
    }

    const cleanedOutput = commandOutput.replace(/\n/g, "\n").replace(/\r/g, "");
    const outputLines = cleanedOutput.split("\n");
    return outputLines;
});
