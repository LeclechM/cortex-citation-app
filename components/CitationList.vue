<script lang="ts" setup>
import type { PropType } from 'vue'
import type { TCitation } from '~/pages/citations/index.vue'

defineProps({
  citations: {
    type: Array as PropType<TCitation[]>,
    required: true,
  },
})
</script>

<template>
  <div class="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]">
    <CitationCard
      v-for="citation in citations"
      :key="citation.id"
      :citation="citation"
      class="mb-6 break-inside-avoid"
    />
  </div>
</template>
