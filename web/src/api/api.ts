const API_URL = "http://localhost:3000";

export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to register user");
  }
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to login user");
  }

  if (data.token) {
    saveToken(data.token);
  }

  return data;
};

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};