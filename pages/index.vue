<script lang="ts" setup>
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full bg-gradient-to-br from-primary-100 to-secondary-200 dark:from-primary-900 dark:to-secondary-800">
    <h1 class="text-5xl font-extrabold mb-4 text-primary-800 dark:text-primary-100 text-center">
      Bienvenue sur <span class="text-secondary-600 dark:text-secondary-300">Cortex Citation App</span>
    </h1>
    <p class="mb-10 text-xl text-primary-600 dark:text-primary-200 text-center max-w-xl">
      Découvrez et explorez des citations inspirantes pour illuminer votre journée !
    </p>
    <NuxtLink to="/citations">
      <Button>
        Voir les citations
      </Button>
    </NuxtLink>

    <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="Imagination et IT" class="mt-12 rounded-2xl shadow-2xl w-full max-w-2xl object-cover">
  </div>
</template>
