import { getSession } from '../utils/sessionStore.js';

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(
    cookieHeader
      .split('; ')
      .map((c) => c.split('='))
      .map(([key, value]) => [key, decodeURIComponent(value)])
  );
}

export function sessionMiddleware(req, res, next) {
  const cookieHeader = req.headers.cookie;
  const cookies = parseCookies(cookieHeader);
  const sessionId = cookies.sessionId;

  if (sessionId) {
    const session = getSession(sessionId);
    if (session) {
      req.session = session;
      req.sessionId = sessionId;
    }
  }

  next();
}