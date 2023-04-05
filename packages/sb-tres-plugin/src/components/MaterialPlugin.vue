<script setup lang="ts">
import { reactive } from 'vue'
import { SbIconButton, SbCard, SbCardHeader, SbCardContent, SbCardFooter, SbButton } from '@storyblok/design-system'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

import HorizontalSlider from './HorizontalSlider.vue'
import MaterialPreview from './MaterialPreview.vue'

const props = defineProps<{
  plugin: any
}>()

type Material = {
  color: number
  metalness: number
  roughness: number
}
const state = reactive({
  isOpen: false,
  selectedColor: '#4f4f4f',
  metalness: 0.5,
  roughness: 0.5,
  availableMaterials:
    props.plugin.data?.availableMaterials?.map((material: Material) => ({
      color: material.color,
      metalness: material.metalness,
      roughness: material.roughness,
    })) || [],
})

function changeColor(color: { hex: string }) {
  state.selectedColor = color.hex
}

function addMaterial() {
  state.availableMaterials.push({
    color: state.selectedColor,
    metalness: state.metalness,
    roughness: state.roughness,
  })
  state.selectedColor = '#4f4f4f'
  state.roughness = 0.5
  state.metalness = 0.5
}
</script>
<template>
  <h2 class="text-primary-400">Paints</h2>

  <ul class="grid grid-cols-6 mb-4 list-none ml-0 pl-0">
    <li
      class="relative w-9 h-9 rounded flex"
      :style="{ backgroundColor: color }"
      v-for="{ color, metalness } in state.availableMaterials"
    >
      <i class="i-ion-sparkles-sharp absolute top-0 right-0 text-yellow" v-show="metalness > 0.5"></i>
    </li>
    <li>
      <SbIconButton
        icon-name="add-block"
        icon-color="primary"
        icon-size="small"
        @click="() => (state.isOpen = !state.isOpen)"
      />
    </li>
  </ul>
  <SbCard v-show="state.isOpen">
    <SbCardHeader :title="'Add material'" align="left" />

    <SbCardContent style="flex: 1">
      <ColorPicker class="mb-8" theme="light" :color="'#fff'" @changeColor="changeColor" />

      <label class="mb-4 font-bold text-primary">Metalness</label>
      <HorizontalSlider class="mb-4" v-model="state.metalness" :min="0" :max="1" :step="0.1" />

      <label class="mb-4 font-bold text-primary">Roughness</label>
      <HorizontalSlider v-model="state.roughness" :min="0" :max="1" :step="0.1" />
    </SbCardContent>
    <Suspense>
      <MaterialPreview v-bind="state" />
    </Suspense>

    <SbCardFooter>
      <SbButton class="mr-4" label="Close" variant="tertiary" size="small" @click="() => (state.isOpen = false)" />
      <SbButton label="Add" variant="primary" size="small" @click="addMaterial" />
    </SbCardFooter>
  </SbCard>
</template>
