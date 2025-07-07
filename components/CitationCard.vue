<script lang="ts" setup>
import type { PropType } from 'vue'
import type { TCitation } from '~/pages/citations/index.vue'
import { Card, CardContent } from '@/components/ui/card'

defineProps({
  citation: {
    type: Object as PropType<TCitation>,
    required: true,
  },
})
</script>

<template>
  <Card>
    <CardContent>
      <div class="text-xs text-muted-foreground mb-2">
        Ajouté le {{ citation.created_at ? new Date(citation.created_at).toLocaleDateString() : '' }}
      </div>
      <div>
        {{ citation.content }}
        <span v-if="citation.from_whom" class="ml-2 italic text-muted-foreground">— {{ citation.from_whom }}</span>
      </div>
    </CardContent>
  </Card>
</template>
