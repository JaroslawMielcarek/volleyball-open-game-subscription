<template>
  <span>
    <p class="with-extra-message">Positions you would like to play</p>
    <p class="extra-message">Choose from most to less desire</p>
    <div class="position" v-for="(coll, index) in availablePositions()" :key="coll.length">
      <span>{{ index + 1 }}</span>
      <div class="radio-group">
        <input type="radio" v-for="(pos) in coll" :key="pos" :name="index.toString()" :label="pos" :value="pos" :checked="sameString(pos, positionsOrden[index])" @click="updateSelection(pos, index)">
      </div>
    </div>
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { sameString } from "@/util/functions"

const emit = defineEmits<{(event: 'positionChoosed', arr: string[]): void}>()
const POSITIONS : string[] = ['EXT', 'CO', 'CE', 'OP', 'LIB']

const positionsOrden = ref<string[]>([])

function availablePositions() {
  const availablePosit : string[][] = [[...POSITIONS]]
  positionsOrden.value.reduce((acc, currVal) => {
    acc.push(currVal)
    const res = POSITIONS.filter(p => !acc.includes(p))
    if (res.length) availablePosit.push(res)
    return acc
  },[] as string[])
  return availablePosit
}

function updateSelection(position: string, index: number){
  if (index === POSITIONS.length) return null
  positionsOrden.value[index] = position
  positionsOrden.value = positionsOrden.value.slice(0, index + 1)
  emit('positionChoosed', positionsOrden.value)
}
</script>

<style lang="scss" scoped>
/* input { display: none;} */
.position {
  display: flex;
  align-items: center;
  width: max-content;
  
}
.radio-group {
  display: inline-flex;
  position: relative;
  padding: 4px;
  input {
    width: auto;
    min-width: 4ch;
    height: 100%;
    appearance: none;
    outline: none;
    cursor: pointer;
    border: 1px solid red;
    padding: 4px 8px;
    border-radius: 2px;
    margin-right: 1ch;
    // background: darkgray;
    color: green;
    transition: all .6s linear;

    &:last-of-type{
      margin-right: 0;
    }
  }
  input:checked {
    background: gray;
    color: white;
  }
  input:before {
    content: attr(label);
    display: inline-block;
    text-align: center;
    width: 100%;
    min-width: 4ch;
  }
}

</style>