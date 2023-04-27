import { API_KEY, BASE_URL } from './consts';

export const fetchDictionary = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}${query}?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch dictionary data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dictionary data:', error);
    throw error;
  }
};
