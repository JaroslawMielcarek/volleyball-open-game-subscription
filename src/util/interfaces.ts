export interface IinTeam {
  team: number,
  position: string
}
export interface Iplayer { 
  id:number,
  name: string,
  positionsOrden: string[],
  subscribed?: boolean
}

export interface IpositionList {
  limit: number,
  subscribed: Iplayer[]
}
export interface IteamTemplate {
  EXT: IpositionList,
  CO: IpositionList,
  CE: IpositionList,
  OP: IpositionList,
  LIB: IpositionList
}

export interface Ipractice {
  teams: IteamTemplate[],
  waitingRoom: Iplayer[]
}
