import {computed} from "vue";


export default defineEventHandler(async (process) => {
    const query = getQuery(process);
    const macAddress = query.url as string;

    const isValidMacAddress = computed(() => {
        const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$|^([0-9A-Fa-f]{4}[.]){2}([0-9A-Fa-f]{4})$/;
        return regex.test(macAddress);
    });

    if (!isValidMacAddress.value) {
        return;
    }


    try {
        const response = await fetch(`https://www.macvendorlookup.com/api/v2/${macAddress}`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error looking up MAC address:", error);
    }
});