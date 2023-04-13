<script setup lang="ts">
import { SbLoading } from '@storyblok/design-system'
import { useFieldPlugin } from './useFieldPlugin'

import MaterialPlugin from './components/MaterialPlugin.vue'

const plugin = useFieldPlugin()
</script>

<template>
  <div>
    <span v-if="plugin.type === 'loading'">
      <SbLoading type="primary" />
    </span>
    <span v-else-if="plugin.type === 'error'">Error</span>
    <div v-else-if="plugin.type === 'loaded'" class="field-plugin pt-4">
      <MaterialPlugin :plugin="plugin" />
    </div>
  </div>
</template>
