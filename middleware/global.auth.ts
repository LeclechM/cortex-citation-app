export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()

  if (!user.value) {
    return navigateTo('/login')
  }

  // If the user is authenticated, allow access to the route
  return true
})
