import React, { useEffect, useState } from "react";
import { getPlayerStorage } from "../../api/storage";
import type { PlayerProps } from "../../api/database";
import {
  getPUUIDSummonerByName,
  getSummonerInfo,
  getSummonerRank,
} from "../../api/riotApi";

const GeneralInfo: React.FC = () => {
  const [player, setPlayer] = useState<PlayerProps | null>(null);
  const [version, setVersion] = useState(null);
  const [summonerImageId, setSummonerImageId] = useState(null);
  const [summonerLevel, setSummonerLevel] = useState(null);
  const [rankInfo, setRankInfo] = useState<any>(null);

  console.log(version);

  async function fetchVersion() {
    const res = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const data = await res.json();
    setVersion(data[0]); // versão mais recente
  }

  async function getSummonerInfomations() {
    const playerStorage = getPlayerStorage();
    try {
      if (playerStorage) {
        console.log("aqui2");
        const playerId = await getPUUIDSummonerByName(
          playerStorage.gameName,
          playerStorage.tagLine
        );
        console.log("player id ==>", playerId);
        const info = await getSummonerInfo(playerId.puuid);
        console.log("info ===> ", info);
        setSummonerImageId(info.profileIconId);
        setSummonerLevel(info.summonerLevel);

        const rank = await getSummonerRank(playerId.puuid);
        console.log(rank);
        if (rank !== null) setRankInfo(rank);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log(getPlayerStorage());
    setPlayer(getPlayerStorage());

    fetchVersion();
    getSummonerInfomations();
  }, []);
  if (player === null && rankInfo === null && summonerImageId === null)
    return <div className="text-white">Sem dados</div>;
  else
    return (
      player &&
      rankInfo &&
      summonerImageId && (
        <>
          <div className="flex flex-row items-center gap-10">
            <div className="flex flex-col items-center">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summonerImageId}.png`}
                alt=""
                className="w-30 h-30 rounded-full"
              />
              <span className="bg-gray-700 rounded font-bold text-white py-1 px-2 mt-[-10px]">
                Lv {summonerLevel}
              </span>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-white text-[30px] font-bold">
                {player.gameName} #{player.tagLine}
              </div>
              <div className="text-white text-[12px] font-bold">
                {rankInfo.tier}-{rankInfo.rank} {rankInfo.lp} pdl
              </div>
              <div className="text-white text-[12px] font-bold">
                {rankInfo.wins} wins - {rankInfo.losses} losses
              </div>
            </div>
          </div>
        </>
      )
    );
};

export default GeneralInfo;
