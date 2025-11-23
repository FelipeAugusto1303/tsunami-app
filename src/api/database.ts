import {
  getFirestore,
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
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

export type Elo = (typeof ELO)[keyof typeof ELO];

export const PlayerStatus = {
  STARTER: "STARTER",
  SUB: "SUB",
  TBD: "TBD",
};

export type PStatus = (typeof PlayerStatus)[keyof typeof PlayerStatus];

export const Role = {
  ADM: "ADM",
  PLAYER: "PLAYER",
};

export type SystemRole = (typeof Role)[keyof typeof Role];

export type PlayerProps = {
  uid: string;
  email: string;
  full_name: string;
  riotId: string;
  puuid: string;
  gameName: string;
  tagLine: string;
  role_primary: string;
  role_secondary: string;
  status: PStatus;
  system_role: SystemRole;
  createdAt: any;
};

export async function createPlayer(
  uid: string,
  data: Omit<PlayerProps, "uid" | "createdAt">
) {
  try {
    const payload: PlayerProps = {
      uid,
      ...data,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "playerBase", uid), payload);
    console.log("Documento player criado com uid:", uid);
  } catch (error) {
    console.error("Erro ao criar documento player:", error);
    throw error;
  }
}

export async function getPlayerByUid(uid: string) {
  const ref = doc(db, "playerBase", uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error("Usuário não encontrado no Firestore.");
  }

  return snapshot.data();
}
