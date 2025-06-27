const sessions = new Map();

export function createSession(userData) {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, userData);
  return sessionId;
}

export function getSession(sessionId) {
  return sessions.get(sessionId);
}

export function destroySession(sessionId) {
  sessions.delete(sessionId);
}