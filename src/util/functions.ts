import { IteamTemplate, Iplayer, IinTeam, Ipractice } from "./interfaces"


export function sameString(val1: string , val2: string){ return val1 === val2 }

export function subscribeToTeam(player: Iplayer, teams: IteamTemplate[]): Iplayer | null {
  if (!player.positionsOrden.length) {
    alert('Please, first choose your desire positions you would like to play')
    return null // player do not have positions choosed
  }
  
  const inTeam = isInTeam(player, teams)
  if (inTeam?.team >= 0) {
    const res = confirm('You are already subscibed in team: ' + inTeam.team + 1 + ' on position: ' + inTeam.position + '!\n'
    + 'Do you want to UNSUBSCRIBE?')
    if (res) removePlayer(player, teams)
    return null
  }
  const x = addPlayer(player, teams)
  return x
}

function addPlayer(player: Iplayer, teams: IteamTemplate[]): Iplayer | null {
  let isAdded = 0
  for (let positionIndex = 0; positionIndex < player.positionsOrden.length; positionIndex++ ){
    if (isAdded) return null
    for(let teamIndex = 0; teamIndex < teams.length; teamIndex++){
      const team: IteamTemplate = teams[teamIndex]
      type ObjectKey = keyof typeof team
      const pos: ObjectKey = player.positionsOrden[positionIndex] as ObjectKey
      if (team[pos].subscribed.length === team[pos].limit) continue //if position is full skip this team
      isAdded = team[pos].subscribed.push(player)// otherwise add player to position
      break
    }
  }
  if (isAdded) return null

  alert('We add you to waiting room!')
  return player
}

export function removePlayer(player: Iplayer, teams: IteamTemplate[]) {
  teams.forEach((team, index) => {
    for (const key in team){
      type ObjectKey = keyof typeof team
      const k: ObjectKey = key as ObjectKey
      team[k].subscribed = team[k].subscribed.filter((e: Iplayer) => e.id !== player.id)
    }
  })
}

export function isInTeam(player: Iplayer, teams: IteamTemplate[]): IinTeam{
  let subscribed = {team: -1, position: ''}
  teams.forEach((team, index) => {
    for (const key in team){
      type ObjectKey = keyof typeof team
      const k: ObjectKey = key as ObjectKey
      const res = team[k].subscribed.find((e: Iplayer) =>  e.id === player.id)
      if (res) subscribed = { team: index, position: k }
    }
  })
  return subscribed
}
export function isWaiting(player: Iplayer, waitingRoom: Iplayer[]): boolean {
  return waitingRoom.find( (e: Iplayer) => e.id === player.id) !== undefined
}
export function isSubscribed(player: Iplayer, practice: Ipractice): boolean {
  return isWaiting(player, practice?.waitingRoom) ? true : isInTeam(player, practice?.teams).team >= 0
}