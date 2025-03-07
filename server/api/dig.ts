import { defineEventHandler, getQuery } from "h3";
import dns from "node:dns/promises";

export default defineEventHandler(async (event) => {
    const { domain } = getQuery(event);
    if (!domain || typeof domain !== "string") {
        return { result: "Ungültige Eingabe" };
    }

    try {
        const records = await dns.resolve(domain);
        return { result: records.join("\n") };
    } catch (error: any) {
        return { result: `Fehler: ${error.message}` };
    }
});