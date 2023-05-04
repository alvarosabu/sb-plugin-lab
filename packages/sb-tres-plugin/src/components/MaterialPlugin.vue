<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { SbIconButton, SbCard, SbCardHeader, SbCardContent, SbCardFooter, SbButton } from '@storyblok/design-system'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

import HorizontalSlider from './HorizontalSlider.vue'
import MaterialPreview from './MaterialPreview.vue'

const props = defineProps<{
  plugin: any
}>()

type Material = {
  color: string
  metalness: number
  roughness: number
  focus: boolean
}
const formatMaterials = (material: Material) => ({
  color: material.color,
  metalness: material.metalness,
  roughness: material.roughness,
})
const state = reactive<{
  isOpen: boolean
  selectedColor: string
  metalness: number
  roughness: number
  availableMaterials: Array<Material>
}>({
  isOpen: false,
  selectedColor: '#00B3B0',
  metalness: 0.5,
  roughness: 0.5,
  availableMaterials:
    props.plugin.data?.value?.availableMaterials?.map((material: Material) => ({
      color: material.color,
      metalness: material.metalness,
      roughness: material.roughness,
    })) || [],
})

function changeColor(color: { hex: string }) {
  state.selectedColor = color.hex
}

function removeMaterial(material: Material) {
  state.availableMaterials = state.availableMaterials.filter(item => item !== material)
  props.plugin.actions.setValue({
    availableMaterials: toRaw(state.availableMaterials),
  })
}

function addMaterial() {
  state.availableMaterials.push({
    color: state.selectedColor,
    metalness: state.metalness,
    roughness: state.roughness,
    focus: false,
  })
  state.selectedColor = '#4f4f4f'
  state.roughness = 0.5
  state.metalness = 0.5
  props.plugin.actions.setValue({
    availableMaterials: toRaw(state.availableMaterials),
  })
}
</script>
<template>
  <ul class="grid grid-cols-6 mb-4 list-none ml-0 pl-0">
    <li
      class="relative w-14 h-14 rounded flex mb-4"
      :style="{ backgroundColor: material.color }"
      v-for="material in state.availableMaterials"
      @mouseenter="() => (material.focus = true)"
      @mouseleave="() => (material.focus = false)"
      @click="removeMaterial(material)"
    >
      <i class="i-ion-sparkles-sharp absolute top-0 right-0 text-yellow text-xl" v-show="material.metalness > 0.5"></i>
      <span
        class="absolute top-0 left-0 bg-black bg-opacity-50 w-full flex h-full items-center justify-center"
        v-if="material.focus"
      >
        <i class="i-ion-close text-white"></i>
      </span>
    </li>
    <li class="tada">
      <SbIconButton icon-name="add-block" icon-color="primary" @click="() => (state.isOpen = !state.isOpen)" />
    </li>
  </ul>
  <SbCard v-show="state.isOpen">
    <SbCardHeader :title="'Add material'" align="left" />

    <Suspense>
      <MaterialPreview v-bind="state" />
    </Suspense>

    <SbCardContent style="flex: 1" class="text-2xl">
      <ColorPicker
        class="important-w-92% important-shadow-none important-bg-transparent border-solid border-1 border-gray-200 mb-8"
        theme="light"
        :color="state.selectedColor"
        @changeColor="changeColor"
      />

      <label class="mb-4 font-bold text-primary">Metalness</label>
      <HorizontalSlider class="mb-4" v-model="state.metalness" :min="0" :max="1" :step="0.1" />

      <label class="mb-4 font-bold text-primary">Roughness</label>
      <HorizontalSlider v-model="state.roughness" :min="0" :max="1" :step="0.1" />
    </SbCardContent>

    <SbCardFooter>
      <SbButton class="mr-4" label="Close" variant="tertiary" size="small" @click="() => (state.isOpen = false)" />
      <SbButton label="Add" variant="primary" size="small" @click="addMaterial" />
    </SbCardFooter>
  </SbCard>
</template>

<style>
.hu-color-picker {
}
</style>
