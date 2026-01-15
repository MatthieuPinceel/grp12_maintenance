<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  src: { // link toward the file we want to display 
    type: String,
    required: true
  },
  alt: { // description 
    type: String,
    default: 'photo'
  },
  width: {
    type: String,
    default: '100%' 
  },
  height: {
    type: String,
    default: 'auto' 
  }
})
</script>

<template>
  <div class="photo-container" :style="{ width: width, height: height }">
    <img :src="src" :alt="alt" />
  </div>
</template>

<style scoped>
.photo-container {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; 
}

.photo-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  transition: transform 0.3s ease;
}

.photo-container img:hover {
  transform: scale(1.05); 
}
</style>
