/**
 * API Configuration with Codespaces Support
 * 
 * Requires VITE_CODESPACE_NAME environment variable to be set in .env.local or .env
 * Example: VITE_CODESPACE_NAME=my-codespace-name
 * 
 * URL Resolution:
 * - With CODESPACE_NAME: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api
 * - Without CODESPACE_NAME: http://localhost:8000/api
 */

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

/**
 * Fetch data from API endpoint with error handling
 * @param {string} endpoint - API endpoint path (e.g., '/users', '/activities')
 * @returns {Promise<Array>} Array of data items
 */
export async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle both paginated responses (with data property) and direct array responses
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    throw error;
  }
}

export { API_BASE_URL, CODESPACE_NAME };
