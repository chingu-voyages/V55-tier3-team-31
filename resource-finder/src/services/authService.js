const API_BASE = import.meta.env.VITE_API_URL;


export const loginUsingGoogle = () => {
    window.location.href = `${API_BASE}/auth/google`;
}

export const loginUsingGithub = () => {
    window.location.href = `${API_BASE}/auth/github`;
}

export const logout = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/logout`, {
        credentials: 'include',
      });
  
      if (res.ok) {
        console.log("Logout success");
        window.location.href = '/login';
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };