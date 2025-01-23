<script lang="ts">
  import type { PageData } from "./$types"

  let { data }: { data: PageData } = $props()
  data.data.sort((a, b) => a.players + b.players)
</script>

<div class="bg-[#070707] text-[#cecece] min-h-screen flex items-center justify-center p-6">
  <div class="grid grid-cols-5 gap-6">
    {#each data.data as server}
      <div class="bg-[#0a0a0a] shadow-md rounded-lg overflow-hidden">
        <div class="bg-[#0c0c0c] px-4 py-2 rounded-t-lg border-b border-[#1a1a1a] text-center">
          <a href="steam://connect/{server.address}:{server.port}" class="text-lg font-semibold text-[#51a2ff] hover:text-[#6ab0ff] transition-colors duration-200">{server.name}</a>
          <p class="text-sm"><span class="font-semibold">{server.map.toLowerCase()}</span> (<span class="font-semibold">{server.players.length}/{server.maxplayers}</span>)</p>
        </div>
        <div class="px-4 py-2">
          <ul>
            {#each server.players as player}
              <li class="py-1">{player.name}</li>
              <hr class="border-[#1a1a1a] last:border-none">
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  </div>
</div>