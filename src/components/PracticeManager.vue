<template>
  <div>
    <h3>Practice</h3>
    <button v-if="!isSubscribed(player, practice)" @click="subscribe()">Subscribe</button>
    <button v-else @click="unsubscribe(player, practice)">Unsubscribe</button>
    <div class="flex">
      <fieldset class="row-5">
        <legend>Waiting room:</legend>
        <span class="player" v-for="(player, index) in practice.waitingRoom" :key="index" >{{ index+1 + ': ' + player.name }}</span>
      </fieldset>
      <fieldset>
        <legend>Subscribed:</legend>
        <div class="team" v-for="(team, index) in practice.teams" :key="index">
          <h3>Team {{ index + 1 }}</h3>
          <div v-for="[key, position] in Object.entries(team)" :key="key">
          <span class="position">{{ key }}:</span>
          <span class="player" v-for="player in position.subscribed" :key="player.toString()">{{ player.name }}</span>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IteamTemplate, Iplayer, Ipractice } from '@/util/interfaces'
import { subscribeToTeam, isSubscribed, isInTeam, isWaiting, removePlayer } from '@/util/functions';
import { ref, computed } from "vue"

const props = defineProps<{teams: IteamTemplate[], player: Iplayer}>()
const teams = computed<IteamTemplate[]>(() => props.teams)
const player = computed(() => props.player)
const practice = ref({
  subscribed: [] as Iplayer[],
  teams: teams,
  waitingRoom: [] as Iplayer[]
  })

function subscribe () {
  const waiting = subscribeToTeam(player.value, practice.value.teams)
  if (waiting) practice.value.waitingRoom.push(waiting)
}
function unsubscribe (player: Iplayer, practice: Ipractice) {
  if (isWaiting(player, practice.waitingRoom)) {
    practice.waitingRoom = practice.waitingRoom.filter((e: Iplayer) => e.id !== player.id)
    return
  }
  if (isInTeam(player, practice.teams).team >= 0) removePlayer(player, practice.teams)
}

</script>

<style lang="scss" scoped>
.position { margin-right: 1ch; }
.player::after { content: '/'; margin-left: 1ch; margin-right: 1ch; }
.player:last-of-type::after { display: none; }
.team { margin: 0 1ch }
fieldset { 
  display: inline-flex;
  margin: 4px;
  &.row-5 {
    flex-direction: column;
    flex: 0 1 calc(20% - 8px);
  }
}
.flex { display: flex;}
</style>