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
  sessionName: string
): { sessionId: string | null; sessionName: string } => {
  const sessionId = uuidv4();
  localStorage.setItem("sessionId", sessionId);
  localStorage.setItem("sessionName", sessionName);

  const keyPair = [{ [sessionId]: sessionName }];
  localStorage.setItem("sessionKeys", JSON.stringify(keyPair));

  return { sessionId, sessionName };
};

export const sessionRetrieve = (): {
  sessionId: string;
  sessionName: string;
}[] => {
  const sessionKeys = JSON.parse(localStorage.getItem("sessionKeys") || "[]");
  return sessionKeys; // Return the array of session keys and session names
};

export const getSessionId = (): {
  sessionId: string | null;
} => {
  const sessionId = localStorage.getItem("sessionId");

  return { sessionId };
};

export const getSessionName = (): {
  sessionName: string | null;
} => {
  const sessionName = localStorage.getItem("sessionName");

  return { sessionName };
};
