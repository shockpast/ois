import { GameDig } from "gamedig"

import type { PageServerLoad } from "./$types"

type Player = { name: string, raw: { score: number; time: number } }

const servers = [
  "128.140.90.181:27015",
  "128.140.90.181:27016",
  "128.140.90.181:27017",
  "128.140.90.181:27018",
  "128.140.90.181:27019",
  "128.140.90.181:27020",
  "128.140.90.181:27021",
  "128.140.90.181:27022",
  "128.140.90.181:27023"
]

export const load: PageServerLoad = async () => {
  const data = []

  for (const server of servers) {
    const [address, port] = server.split(":")

    try {
      const query = await GameDig.query({
        type: "l4d2",
        host: address,
        port: parseInt(port),
        givenPortOnly: true,
      })

      const match = Array.from(query.name.matchAll(/OI \| (?:.+) \| (.+)/gi))[0]
      match.shift()

      const name = match[0]
      const players = JSON.parse(JSON.stringify(query.players)) as Player[]
      players.filter((player) => player.name.length >= 1)

      data.push({ name, address, port, players: players, maxplayers: query.maxplayers, map: query.map })
    } catch (error) {
      continue
    }
  }

  return { data }
};