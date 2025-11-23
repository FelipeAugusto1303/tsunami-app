import React, { useEffect, useState } from "react";
import { getPlayerStorage } from "../../api/storage";
import type { PlayerProps } from "../../api/database";
import { getPUUIDSummonerByName } from "../../api/riotApi";

// import { Container } from './styles';

const GeneralInfo: React.FC = () => {
  const [player, setPlayer] = useState<PlayerProps | null>(null);

  async function getPuuid() {
  }
  useEffect(() => {
    console.log(getPlayerStorage());
    setPlayer(getPlayerStorage());
    const result = getPuuid();
    console.log(result);

    async function loadData() {
      const result = await getPUUIDSummonerByName("TSU JINXED", "TSU2");
      console.log(result);
    }
    loadData();
  }, []);
  if (player === null) return <div className="text-white">Sem dados</div>;
  return <div className="text-white">{player.nickname}</div>;
};

export default GeneralInfo;
