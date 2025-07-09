<script lang="ts" setup>
import type { PropType } from 'vue'
import type { TCitation } from '~/pages/citations/index.vue'

const props = defineProps({
  citation: {
    type: Object as PropType<TCitation>,
    required: true,
  },
})

const emit = defineEmits<{
  delete: [id: string]
}>()
const user = useSupabaseUser()
const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'short',
})

const fromWhen = computed(() =>
  props.citation.from_when ? dateFormatter.format(new Date(props.citation.from_when)) : '',
)
</script>

<template>
  <UiCard class="relative">
    <UiCardContent>
      <div>
        {{ citation.content }}
        <span v-if="citation.from_whom" class="ml-2 italic text-muted-foreground">— {{ citation.from_whom }} {{ fromWhen }}</span>
      </div>
    </UiCardContent>
    <UiButton
      v-if="user?.id === citation.profiles?.id"
      class="absolute -top-2 -right-2"
      variant="destructive" size="icon"
    >
      <Icon
        name="radix-icons:cross-2"
        @click="emit('delete', citation.id)"
      />
    </UiButton>
  </UiCard>
</template>
