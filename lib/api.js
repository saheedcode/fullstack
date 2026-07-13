/**
 * lib/api.js
 * Configured to communicate directly with the backend (port 5000)
 */
/*
export const API_BASE = 'http://localhost:5000/api';

export const Auth = {
  saveToken(token) {
    if (typeof window !== 'undefined') localStorage.setItem('foodblog_token', token);
  },
  getToken() {
    return typeof window !== 'undefined' ? localStorage.getItem('foodblog_token') : null;
  },
  saveUser(user) {
    if (typeof window !== 'undefined') localStorage.setItem('foodblog_user', JSON.stringify(user));
  },
  getUser() {
    if (typeof window === 'undefined') return null;
    try { return JSON.parse(localStorage.getItem('foodblog_user')); } catch { return null; }
  },
  isLoggedIn() { return !!this.getToken(); },
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('foodblog_token');
      localStorage.removeItem('foodblog_user');
    }
  }
};

/**
 * Robust API request helper
 
export async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  // 1. Ensure path starts with a single slash
  let normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 2. Remove /api/ prefix if it exists to avoid double-prefixing
  if (normalizedPath.startsWith('/api/')) {
    normalizedPath = normalizedPath.replace('/api', '');
  }

  // 3. Construct final URL: API_BASE (which ends in /api) + normalizedPath
  const url = `${API_BASE}${normalizedPath}`;

  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = Auth.getToken();
    if (token) headers['x-auth-token'] = token;
  }

  const options = {
    method,
    headers,
    cache: 'no-store',
    body: method !== 'GET' && body ? JSON.stringify(body) : undefined
  };

  try {
    const res = await fetch(url, options);

    if (res.status === 204) return null;

    let data;
    try {
      const text = await res.text();
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      throw new Error(`Invalid server response format (Status: ${res.status})`);
    }

    if (!res.ok) {
      throw new Error(data?.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error("Network error: Check if backend is running on port 5000 and CORS is enabled.");
    }
    throw err;
  }
}

// --- Recipe Helpers ---

export function recipeFromText(text) {
  try {
    return typeof text === 'string' ? JSON.parse(text) : text;
  } catch (e) {
    return { title: 'New Recipe', content: text };
  }
}

export function recipeToText(recipe) {
  return typeof recipe === 'object' ? JSON.stringify(recipe, null, 2) : recipe;
}

// --- Utility Helpers ---

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
}

export const CATEGORY_LABEL = { 
  breakfast: 'Breakfast', 
  lunch: 'Lunch', 
  dinner: 'Dinner' 
};

export function fallbackImage(category) {
  const map = {
    breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
    lunch: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
    dinner: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'
  };
  return map[category] || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80';
}
*/


/**
 * lib/api.js
 * Configured to communicate directly with the backend (port 5000)
 * to avoid proxy-based request size limits.
 */

export const API_BASE = 'http://localhost:5000/api';

export const Auth = {
  saveToken(token) {
    if (typeof window !== 'undefined') localStorage.setItem('foodblog_token', token);
  },
  getToken() {
    return typeof window !== 'undefined' ? localStorage.getItem('foodblog_token') : null;
  },
  saveUser(user) {
    if (typeof window !== 'undefined') localStorage.setItem('foodblog_user', JSON.stringify(user));
  },
  getUser() {
    if (typeof window === 'undefined') return null;
    try { return JSON.parse(localStorage.getItem('foodblog_user')); } catch { return null; }
  },
  isLoggedIn() { return !!this.getToken(); },
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('foodblog_token');
      localStorage.removeItem('foodblog_user');
    }
  }
};

/**
 * Robust API request helper
 */
export async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  // Ensure the path always starts with /api/ correctly
  // This removes the prefix if provided, then adds it back to ensure consistency
  let cleanPath = path.startsWith('/api') ? path.replace('/api', '') : path;
  cleanPath = `/api/${cleanPath.replace(/^\/+/, '')}`;

  const url = `${API_BASE}${cleanPath.replace('/api/', '/')}`;

  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = Auth.getToken();
    if (token) headers['x-auth-token'] = token;
  }

  const options = {
    method,
    headers,
    cache: 'no-store',
    body: method !== 'GET' && body ? JSON.stringify(body) : undefined
  };

  try {
    const res = await fetch(url, options);

    if (res.status === 204) return null;

    let data;
    try {
      const text = await res.text();
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      throw new Error(`Invalid server response format (Status: ${res.status})`);
    }

    if (!res.ok) {
      throw new Error(data?.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error("Network error: Check if backend is running on port 5000 and CORS is enabled.");
    }
    throw err;
  }
}

// --- Recipe Helpers ---

export function recipeFromText(text) {
  try {
    return typeof text === 'string' ? JSON.parse(text) : text;
  } catch (e) {
    return { title: 'New Recipe', content: text };
  }
}

export function recipeToText(recipe) {
  return typeof recipe === 'object' ? JSON.stringify(recipe, null, 2) : recipe;
}

// --- Utility Helpers ---

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
}

export const CATEGORY_LABEL = { 
  breakfast: 'Breakfast', 
  lunch: 'Lunch', 
  dinner: 'Dinner' 
};

export function fallbackImage(category) {
  const map = {
    breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
    lunch: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
    dinner: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'
  };
  return map[category] || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80';
}