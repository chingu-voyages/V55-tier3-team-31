const API_BASE = import.meta.env.VITE_API_URL;

export const getUserDetails = async() => {
    const user = await fetch(`${API_BASE}/auth/me`, {
        method: 'GET',
        credentials: 'include',
      }).then(res => {
        return res.json()
    })

    return user;
}

export const updateUserDetails = async(user) => {
    const updatedUser = await fetch(`${API_BASE}/auth/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json());

    return updatedUser;
}