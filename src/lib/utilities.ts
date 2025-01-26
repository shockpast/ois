import type { Server } from "$lib/types"

export function friendlyTime(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - (hours * 3600)) / 60)
  seconds = Math.floor(seconds - (hours * 3600) - (minutes * 60))

  let result = ""

  if (hours > 0) result += `${hours}h `
  if (minutes > 0) result += `${minutes}min `
  result += `${seconds}s`

  return result
}

export async function getServerInfo(address: string, port: string) {
  const response = await fetch(`/api/serverinfo?address=${address}&port=${port}`)
  const json = await response.json() as Server

  return json
}