<template>
  <div class="container">
    <h3>Practice Settings</h3>
    <span>
      <label>Choose number of teams <span class="extra-message">(6 players / team)</span>:</label>
      <select v-model="selectedNumber">
        <option v-for="num in LIMIT" :value="num" :key="num">{{ num }}</option>
      </select>
    </span>
    <button @click="generateTeamTemplate(selectedNumber)">Generate teams with fake participans</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { IteamTemplate, Iplayer } from '@/util/interfaces'
import { subscribeToTeam } from "@/util/functions";

const emit = defineEmits<{(event: 'createdNewTeamTemplate', val: IteamTemplate[]): void }>()
const LIMIT = 4 //We have only 2 courts

const selectedNumber = ref<number>(1)
onMounted(() => generateTeamTemplate(1))

async function generateTeamTemplate(numberOfTeams: number) {
  const arr: IteamTemplate[] = []
  for(let x = 0; x< numberOfTeams; x++){
    arr.push({
    EXT: { limit: 2, subscribed: []},
    CO: { limit: 1, subscribed: []},
    CE: { limit: 1, subscribed: []},
    OP: { limit: 1, subscribed: []},
    LIB: { limit: 1, subscribed: []},
    })
  }
  const players: Iplayer[] = await generateRandom()
  const list = []
  for(const player of players){
    list.push(subscribeToTeam(player, arr))
  }
  Promise.all(await list).then( () => emit('createdNewTeamTemplate', arr) )
}
function generateRandom(){
  const positions = ['EXT','CO','CE','OP','LIB']
  const names = ['Luka', 'Andres', 'Greg', 'Angel', 'Valerio', 'Mauri', 'Sara', 'Vita', 'Patrycja', 'Kasia']
  function getRandomIndex(arr: string[]){ return Math.floor(Math.random() * arr.length) }
  function getPositionsList(){
    const playerPositions: string[] = []
    positions.reduce((acc, currVal) => {
      const index = getRandomIndex(acc)
      playerPositions.push(acc[index])
      acc.splice(index,1)
      return acc
    },[...positions])
    return playerPositions
  }
  function getRandomPeople(): Iplayer[] {
    const players: Iplayer[] = []
    for(let x=0; x<getRandomIndex(names); x++){
      const index = getRandomIndex(names)
      const name = names[index]
      players.push({id: getRandomIndex(new Array(10000)),name: name, positionsOrden: getPositionsList()})
    }
    return players
    // console.log('players', players)
  }
  return getRandomPeople()
}
</script>