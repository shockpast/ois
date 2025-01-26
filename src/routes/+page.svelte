<script lang="ts">
  import { onMount } from "svelte"
  // import consola from "consola"

  import { friendlyTime, getServerInfo } from "$lib/utilities"
  import type { Server } from "$lib/types"

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

  const data: Server[] = $state([])

  async function fetch() {
    let i = 0

    for (const server of servers) {
      const [address, port] = server.split(":")
      const json = await getServerInfo(address, port)

      data[i++] = json

      // consola.info(`Updated ${json.data.name} at ${new Date().toUTCString()}`)
      // consola.info(`${json.data.players.length}/${json.data.maxplayers} on ${json.data.map}`)
    }
  }

  onMount(async () => {
    await fetch()
    setInterval(async () => await fetch(), 5000)
  })
</script>

<div class="bg-[#070707] text-[#cecece] min-h-screen flex items-center justify-center p-6">
  <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-rows-2 gap-2">
    {#each servers as _server, serverIndex}
      <div class={["bg-[#0a0a0a] shadow-md rounded-lg max-h-80 max-w-64 w-56", serverIndex >= 5 && "relative 2xl:left-1/2"]}>
        {#if (!data[serverIndex])}
          <div class="bg-[#0c0c0c] px-4 py-2 rounded-t-lg border-b border-[#1a1a1a] text-center">
            <p class="text-lg">Loading...</p>
          </div>
        {:else}
          {@const server = data[serverIndex].data}

          <div class="bg-[#0c0c0c] px-4 py-2 rounded-t-lg border-b border-[#1a1a1a] text-center">
            <a href="steam://connect/{server.address}:{server.port}" class="text-lg font-semibold text-[#51a2ff] hover:text-[#6ab0ff] transition-colors duration-200">{server.name}</a>
            <span class="font-semibold text-lg">({server.players.length}/{server.maxplayers})</span>

            <p class="text-sm"><span class="font-semibold">{server.map.toLowerCase()}</span></p>
          </div>

          <div class={["px-4", server.players.length <= 0 ? "py-6" : "py-2", "max-h-52 overflow-y-auto"]}>
            <ul>
              {#each server.players as player}
                <li class="py-1 decoration-1 decoration-wavy decoration-white" title="Time: {friendlyTime(player.raw.time)!}">{player.name}</li>
                <hr class="border-[#1a1a1a] last:border-0">
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>