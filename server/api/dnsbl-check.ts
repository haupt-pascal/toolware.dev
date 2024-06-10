import axios from "axios";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const ipAddress = query.ipAddress as string;

  if (!ipAddress) {
    return { message: "Please provide a valid IP Address" };
  }

  if (/[^0-9.]/.test(ipAddress)) {
    return { message: "Invalid characters detected in the IP Address!" };
  }

  try {
    const response = await axios.get(
      `https://dnsbl-check.reachcoding.eu/api/?server=${ipAddress}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return { message: "An error occurred while fetching IP information" };
  }
});
