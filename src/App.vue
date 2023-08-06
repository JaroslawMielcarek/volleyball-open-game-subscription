<template>
  <h1>Volleyball Open Game creation</h1>
  <fieldset>
    <legend>Settings</legend>
    <PlayerDetails :player="player" @updateName="updateName" @updatePositions="updatePositions"/>
    <PracticeSettings @createdNewTeamTemplate="setTeamsTemplate"/>
  </fieldset>
  <PracticeManager :teams="teams" :player="player"/>
</template>

<script setup lang="ts">
import PlayerDetails from './components/PlayerDetails.vue';
import PracticeManager from './components/PracticeManager.vue';
import PracticeSettings from './components/PracticeSettings.vue';
import { IteamTemplate, Iplayer } from '@/util/interfaces'
import { ref } from 'vue'

const teams = ref<IteamTemplate[]>([])
const player = ref<Iplayer>({id: 1, name: '' as string, positionsOrden: [] as string[]})

function setTeamsTemplate(val: IteamTemplate[]){teams.value = val}
function updateName(val: string) {player.value.name = val}
function updatePositions(val: string[]) {player.value.positionsOrden = val}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
label {
  margin-right: 1ch;
}
fieldset { display: flex; }
button { margin: 8px 0 }
.container {
  display: inline-grid;
  align-content: flex-start;
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
  background-color: rgb(215, 254, 254);
}
.extra-message {
  font-size: 0.9em;
  font-weight: lighter;
  margin-top: 0;
}
.with-extra-message {
  margin-bottom: 0.1em;
}
</style>
