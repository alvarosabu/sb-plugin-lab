import {
    defineConfig,
    presetUno,
    presetAttributify,
    presetIcons,
    Preset,
    transformerDirectives,
  } from 'unocss'

export default defineConfig({
    theme: {
        colors: {
            primary: '#00B3B0',
            secondary: '#1B243F',
        }
    },
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
    ],
    transformers: [
        transformerDirectives(),
    ],
})