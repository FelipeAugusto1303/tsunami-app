import axios from "axios";

const api = axios.create({ baseURL: "https://americas.api.riotgames.com" });
const RIOT_API_KEY = "RGAPI-8d38d8f8-f774-4f91-84ad-ad7bcc5016e6"

export async function getPUUIDSummonerByName(gameName: string, tagLine: string) {
  const res = await api.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    {
      headers: {
        "X-Riot-Token": RIOT_API_KEY
      }
    }
  );
  return res.data;
}