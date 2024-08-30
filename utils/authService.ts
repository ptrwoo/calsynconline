import { v4 as uuidv4 } from "uuid";

export const signIn = (name: string): { userId: string; name: string } => {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
  }

  localStorage.setItem("userName", name);

  return { userId, name };
};

export const signOut = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
};

export const getCurrentUser = (): {
  userId: string | null;
  name: string | null;
} => {
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("userName");
  return { userId, name };
};

export const sessionOut = () => {
  localStorage.removeItem("sessionId");
  localStorage.removeItem("sessionName");
  localStorage.removeItem("sessionDates");
};

export const sessionIn = (
  sessionName: string,
): { sessionId: string; sessionName: string } => {
  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("sessionId", sessionId);
  }

  localStorage.setItem("sessionName", sessionName);

  return { sessionId, sessionName };
};

export const getSessionId = (): {
  sessionId: string | null;
  sessionName: string | null;
} => {
  const sessionId = localStorage.getItem("sessionId");
  const sessionName = localStorage.getItem("sessionName");
  return { sessionId, sessionName };
};
