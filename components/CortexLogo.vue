<script setup lang="ts">
const text = 'CortexCitations'
const textArray = ref(text.split(''))
</script>

<template>
  <span class="ml-2 text-3xl font-bold text-primary handwriting-animation">
    <span v-for="(char, i) in textArray" :key="i" :style="{ 'animation-delay': `${i * 0.08}s` }" class="handwriting-char">{{ char }}</span>
  </span>
</template>

<style scoped>
svg {
  vertical-align: middle;
}
span {
  vertical-align: middle;
}
.handwriting-animation {
  font-family: 'Dancing Script', 'Pacifico', cursive, sans-serif;
  display: inline-block;
  white-space: pre;
}
.handwriting-char {
  opacity: 0;
  display: inline-block;
  animation: handwriting 0.5s forwards;
  font-variation-settings: 'wght' 700;
}
@keyframes handwriting {
  from {
    opacity: 0;
    filter: blur(2px);
    transform: translateY(10px) scaleX(0.8);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scaleX(1);
  }
}
</style>
