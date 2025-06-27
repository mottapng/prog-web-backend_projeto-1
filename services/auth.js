import { USERS } from "../utils/constants.js";
import { logError } from "../utils/logger.js";
import { createSession } from "../utils/sessionStore.js";

export async function login(data) {
  try {
    if (!data.email || !data.senha) {
      throw new Error("'email' e 'senha' são obrigatórios");
    }

    const user = USERS.find(u => u.email === data.email && u.senha === data.senha);

    if (!user) {
      throw new Error("Credenciais Inválidas")
    }
  
    const sessionId = createSession({ id: user.id, email: user.email });

    return sessionId;
  } catch (error) {
    logError(error);
    throw error;
  }
}