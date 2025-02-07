
export async function fetchData<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return json;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}