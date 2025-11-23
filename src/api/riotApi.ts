import axios from "axios";

const api = axios.create({ baseURL: "https://americas.api.riotgames.com" });
const brApi = axios.create({ baseURL: "https://br1.api.riotgames.com/lol" });

const RIOT_API_KEY = "RGAPI-8d38d8f8-f774-4f91-84ad-ad7bcc5016e6";

export async function getPUUIDSummonerByName(
  gameName: string,
  tagLine: string
) {
  const res = await api.get(
    `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${RIOT_API_KEY}`,
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
  return res.data;
}

export async function getSummonerInfo(puuid: string) {
  const res = await brApi.get(`/summoner/v4/summoners/by-puuid/${puuid}`, {
    headers: {
      "X-Riot-Token": RIOT_API_KEY,
    },
  });
  return res.data;
}

export async function getSummonerRank(encryptedSummonerId: string) {
  try {
    const res = await brApi.get(
      `/league/v4/entries/by-puuid/${encryptedSummonerId}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );

    const ranks = res.data;

    // Retorna apenas o elo da SoloQ
    const soloQ = ranks.find(
      (queue: any) => queue.queueType === "RANKED_SOLO_5x5"
    );

    if (!soloQ) return null; // jogador unranked

    return {
      tier: soloQ.tier, // GOLD, SILVER, PLATINUM...
      rank: soloQ.rank, // I, II, III, IV
      lp: soloQ.leaguePoints, // ex: 75 LP
      wins: soloQ.wins,
      losses: soloQ.losses,
    };
  } catch (error: any) {
    console.error("Erro ao buscar elo:", error?.response?.data || error);
    throw error;
  }
}
