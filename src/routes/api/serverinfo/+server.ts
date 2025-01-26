import { GameDig } from "gamedig"
import consola from "consola"

import type { RequestHandler } from "./$types"

type Player = { name: string, raw: { score: number; time: number } }

const json = JSON.stringify

export const GET: RequestHandler = async ({ url }) => {
  const address = url.searchParams.get("address")
  const port = Number(url.searchParams.get("port"))

  try {
    const query = await GameDig.query({
      host: address!,
      port: port,
      type: "l4d2",
      socketTimeout: 5000,
      attemptTimeout: 5000,
      maxRetries: 5,
    })

    const match = Array.from(query.name.matchAll(/OI \| (?:.+) \| (.+)/gi))[0]
    match.shift()

    const name = match[0]
    const players = JSON.parse(JSON.stringify(query.players)) as Player[]
    players.filter((player) => player.name.length >= 1)

    return new Response(json({ ok: true, data: { name, address, port, players: players, maxplayers: query.maxplayers, map: query.map } }))
  } catch (err) {
    consola.withTag(`${address}:${port}`).error(err)

    return new Response(json({ ok: false, error: err }))
  }
}