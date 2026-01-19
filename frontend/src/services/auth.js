const API_URL = "http://localhost:3000/api/auth";

export async function registerStudent(data) {
  const res = await fetch(`${API_URL}/register/student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Registration failed");
  }
}

export async function registerTutor(data) {
  const res = await fetch(`${API_URL}/register/tutor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Registration failed");
  }
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  return res.json();
}

export async function logout() {
  const res = await fetch("http://localhost:3000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
}
