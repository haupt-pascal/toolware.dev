import axios from 'axios';
import { defineEventHandler, getQuery } from 'h3';

const config = useRuntimeConfig();
const API_KEY = config.public.abuse;

export default defineEventHandler(async (process) => {
  const query = getQuery(process);
  const ipAddress = query.ipAddress as string;

  if (!ipAddress) {
    return 'Please provide a valid IP Address';
  }

  if (
    ipAddress.includes('&' || '|' || ';' || '&&' || '||' || '`' || '$' || '<' || '>' || '(' || ')')
  ) {
    return 'Invalid characters detected in the IP Address!';
  }

  try {
    const response = await axios.get('https://api.abuseipdb.com/api/v2/check', {
      params: {
        ipAddress,
        maxAgeInDays: 30,
        verbose: true,
      },
      headers: {
        Key: API_KEY,
        Accept: 'application/json',
      },
    });

    // Hier können Sie die erhaltenen Daten verarbeiten oder sie einfach zurückgeben
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred while fetching IP information';
  }
});
