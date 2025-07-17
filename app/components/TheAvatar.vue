<script lang="ts" setup>
const user = useSupabaseUser()

const avatarUrl = computed(() => {
  if (user.value?.user_metadata?.avatar_url) {
    return user.value.user_metadata.avatar_url
  }
  if (user.value?.email) {
    return `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(user.value.email)}`
  }
  return ''
})

const { auth } = useSupabaseClient()

async function signOut() {
  const { error } = await auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
  }
  navigateTo('/signin')
}

const userFullName = computed(() => {
  const firstName = user.value?.user_metadata?.first_name || ''
  const lastName = user.value?.user_metadata?.last_name || ''
  return `${firstName} ${lastName}`.trim()
})
</script>

<template>
  <UiDropdownMenu v-if="user">
    <UiDropdownMenuTrigger as-child>
      <UiAvatar>
        <UiAvatarImage
          :src="avatarUrl"
          alt="User avatar"
          class="h-8 w-8 rounded-full object-cover"
        />
        <UiAvatarFallback>
          <UiSkeleton class="h-8 w-8 rounded-full" />
        </UiAvatarFallback>
      </UiAvatar>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="w-56">
      <UiDropdownMenuLabel>{{ userFullName ?? 'Mon compte' }}</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem>
        <NuxtLink to="/account/profile" class="flex items-center gap-2">
          <Icon name="radix-icons:person" class="h-4 w-4" />
          Mon profil
        </NuxtLink>
      </UiDropdownMenuItem>
      <UiDropdownMenuItem @click="signOut">
        <Icon name="radix-icons:exit" class="h-4 w-4" />
        Se déconnecter
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
