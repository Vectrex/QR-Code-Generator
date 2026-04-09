<script setup>
  import { stringToQrMatrix, defaultOptions } from './stringToQrMatrix'
  import { computed } from 'vue'

  const props = defineProps({
    text: { type: String, required: true },
    options: { type: Object, default: () => ({}) },
    gutter: { type: Number, default: 4 },
    moduleSize: { type: Number, default: 10 },
    svgAsPath: { type: Boolean, default: true },
  })
  const mergedOptions = computed(() => ({...defaultOptions, ...props.options }))
  const matrix = computed(() => stringToQrMatrix(props.text, mergedOptions.value))
  const totalSize = computed(() => (matrix.value.length + 2 * props.gutter) * props.moduleSize)
  const path = computed(() => {
    const { gutter, moduleSize, svgAsPath } = props
    const size = matrix.value.length
    let path = ''
    for (let r = 0; r < size; ++r) {
      for (let c = 0; c < size; ++c) {
        if (matrix.value[r][c]) {
          let x = (c + gutter) * moduleSize, y = (r + gutter) * moduleSize
          path += svgAsPath ? `M${x},${y}h${moduleSize}v${moduleSize}h-${moduleSize}z` : `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" />`
        }
      }
    }

    return path
  })
</script>
<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="'0 0 ' + totalSize + ' ' + totalSize" :width="totalSize" :height="totalSize"
  >
    <rect width="100%" height="100%" fill="white" />
    <path v-if="svgAsPath" :d="path" fill="black" />
    <g v-else fill="black" v-html="path"></g>
  </svg>`
</template>