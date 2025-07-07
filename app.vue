<script lang="ts" setup>
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 requires this import
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtErrorBoundary>
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <Toaster />
      <NuxtPage />
    </NuxtLayout>
  </NuxtErrorBoundary>
</template>
