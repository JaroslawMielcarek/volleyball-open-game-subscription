<template>
  <div class="container">
    <h3>Player details</h3>
    <span>
      <label for="name">Insert your name:</label>
      <input id="name" :value="playerName" @blur="saveName" placeholder="Alex" required/>
    </span>
    <PreferedPositions @positionChoosed="updatePositions"/>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import PreferedPositions from "./PreferedPositions.vue";
import { Iplayer } from '@/util/interfaces'

const emit = defineEmits<{ (e: 'updateName', val: string): void, (e:'updatePositions', val: string[]): void }>()
const props = defineProps<{player: Iplayer}>()

// const player = ref({name: 'Unknown' as string, positionsOrden: [] as Array<string>})
const player = computed(() => props.player )
const playerName = computed(() => player.value?.name )
const playerPosition = computed(() => player.value?.positionsOrden)

const saveName = (e: Event) => {
  const target = e.target as HTMLInputElement
  const val = target.value.trim()
  console.log({val})
  if (val === '' || val === null) {
    player.value.name = 'Unknown'
    return alert('Name must be provided!')
  }
  emit('updateName', val)
  // player.value.name = val
}
function updatePositions(val: string[]){
  emit('updatePositions', val)
  // player.value.positionsOrden = val
}
</script>

<style>

</style>