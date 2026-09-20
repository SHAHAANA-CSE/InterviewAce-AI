export const USERS_KEY = "iace_users";
export const SESSION_KEY = "iace_session";
export const THEME_KEY = "iace_theme";

export function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function loadSession() {
  return localStorage.getItem(SESSION_KEY);
}

export function saveSession(email) {
  localStorage.setItem(SESSION_KEY, email);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
