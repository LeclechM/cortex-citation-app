<script lang="ts" setup>
import { toast } from 'vue-sonner'
import CitationList from '@/components/CitationList.vue'
import { Button } from '@/components/ui/button'

const client = useSupabaseClient()

export interface TCitation {
    id: string;
    content: string;
    from_whom: string;
    from_when: string | null;
    created_at: string;
    profiles: {
        id: string;
    };
}
const { data: citations, refresh } = await useAsyncData('citations', async () => {
  const { data, error } = await client.from('citations').select('id,content,from_whom,from_when,created_at,profiles(id)').order('created_at', { ascending: false })
  if (error) {
    toast.error(`Erreur lors de la récupération des citations: ${error.message}`)
    return []
  }
  return data
})

async function deleteCitation(id: string) {
  const { error } = await client.from('citations').delete().eq('id', id)
  if (error) {
    toast.error(`Erreur lors de la suppression de la citation: ${error.message}`)
  }
  else {
    toast.success('Citation supprimée avec succès!')
    refresh() // Re-fetch citations after deletion
  }
}
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

    <CitationList v-if="citations && citations.length > 0" :citations="citations" @delete="deleteCitation" />
    <div v-else class="text-center text-muted-foreground mt-12">
      <p>Aucune citation enregistrée pour le moment.</p>
    </div>
  </div>
</template>

<style>

</style>
