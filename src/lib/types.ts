export type Player = {
  name: string
  raw: {
    score: number
    time: number
  }
}

export type Server = {
  data: {
    address: string
    port: number
    name: string
    map: string
    maxplayers: number
    players: Player[]
  }
}