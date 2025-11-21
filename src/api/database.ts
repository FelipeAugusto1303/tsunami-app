import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../config/firebase-config";


const db = getFirestore(app);

export const ELO = {
  IRON: "IRON",
  BRONZE: "BRONZE",
  SILVER: "SILVER",
  GOLD: "GOLD",
  PLATINUM: "PLATINUM",
  EMERALD: "EMERALD",
  DIAMOND: "DIAMOND",
  MASTER: "MASTER",
  GRANDMASTER: "GRANDMASTER",
  CHALLENGER: "CHALLENGER",
} as const;

export type Elo = typeof ELO[keyof typeof ELO];

export const PlayerStatus = {
    STARTER: "STARTER",
    SUB: "SUB",
    TBD: "TBD"
}

export type PlayerProps = {
    current_elo: string,
      email: string,
      full_name: string,
      nickname: string,
      role_primary: Elo,
      role_secondary: Elo,
      status: "STARTER",
      system_role: "ADM"
}



export async function createPlayer(data: PlayerProps) {
  try {
    const docRef = await addDoc(collection(db, "playerBase"), {
      current_elo: "SILVER",
      email: "felipe.augusto.1303@gmail.com",
      full_name: "Felipe Augusto Souza Guimaraes",
      nickname: "JINXED",
      role_primary: "ADC",
      role_secondary: "MID",
      status: "STARTER",
      system_role: "ADM"
    });

    console.log("Documento criado com ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao criar documento:", error);
  }
}