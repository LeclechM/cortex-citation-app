<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Skeleton } from '@/components/ui/skeleton'

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
  navigateTo('/login')
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Avatar>
        <AvatarImage
          :src="avatarUrl"
          alt="User avatar"
          class="h-8 w-8 rounded-full object-cover"
        />
        <AvatarFallback>
          <Skeleton class="h-8 w-8 rounded-full" />
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem @click="signOut">
        Se déconnecter
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
