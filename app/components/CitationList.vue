<script lang="ts" setup>
import type { PropType } from 'vue'
import type { TCitation } from '~/pages/citations/index.vue'

defineProps({
  citations: {
    type: Array as PropType<TCitation[]>,
    required: true,
  },
})

const emit = defineEmits<{
  delete: [id: string]
}>()
</script>

<template>
  <div class="columns-2 gap-4 sm:columns-3 sm:gap-8">
    <CitationCard
      v-for="citation in citations"
      :key="citation.id"
      :citation="citation"
      class="mb-6 break-inside-avoid"
      @delete="emit('delete', citation.id)"
    />
  </div>
</template>
