const API_BASE = import.meta.env.VITE_API_URL;

export const likeResource = async (resource) => {
    console.log('Liking resource frontend:', resource);
    try {
        const response = await fetch(`${API_BASE}/api/resources/like`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...resource }),
        });

        if (!response.ok) {
            throw new Error('Failed to like resource');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error liking resource:', error);
        throw error;
    }
}

export const getPopularResources = async () => {
    try {
        const response = await fetch(`${API_BASE}/api/resources/popular`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch popular resources');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching popular resources:', error);
        throw error;
    }
}