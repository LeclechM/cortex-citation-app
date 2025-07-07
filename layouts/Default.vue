<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="flex justify-between items-center p-4 gap-2">
      <CortexLogo />
      <div class="flex gap-2">
        <TheThemeSelector />
        <TheAvatar />
      </div>
    </div>
    <slot />
  </div>
</template>
