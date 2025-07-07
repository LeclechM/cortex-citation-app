<script lang="ts" setup>
import type { Database } from '~/types/database.types'
import { toast } from 'vue-sonner'
import CitationList from '@/components/CitationList.vue'
import { Button } from '@/components/ui/button'

const client = useSupabaseClient<Database>()

export interface TCitation {
  id: string
  content: string
  from_whom?: string
  created_at: string
  profiles?: {
    id: string
  }
}
const { data: citations } = await useAsyncData<TCitation[]>('citations', async () => {
  const { data, error } = await client.from('citations').select('id,content,from_whom,created_at, profiles(id)').order('created_at', { ascending: false })
  if (error) {
    toast.error(`Erreur lors de la récupération des citations: ${error.message}`)
    return []
  }
  return data
})
</script>

<template>
  <div class="px-4 sm:px-8 md:px-16 py-8">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <p class="text-muted-foreground text-base">
          Retrouvez ici toutes vos citations enregistrées, classées par date d'ajout.
        </p>
      </div>
      <NuxtLink to="/citations/add">
        <Button
          class="ml-4"
          variant="default"
        >
          <Icon name="radix-icons:plus" class="mr-2" />
          Citation
        </Button>
      </NuxtLink>
    </div>

    <CitationList v-if="citations && citations.length > 0" :citations="citations" />
    <div v-else class="text-center text-muted-foreground mt-12">
      <p>Aucune citation enregistrée pour le moment.</p>
    </div>
  </div>
</template>

<style>

</style>
