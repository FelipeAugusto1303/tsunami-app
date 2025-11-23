export function getPlayerStorage(){
    const player = localStorage.getItem("player");
    return player ? JSON.parse(player) : null;
}