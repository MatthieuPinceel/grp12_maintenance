<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// List of images to show 
const images = [
  '/Images/Home/G-jv7WCbQAEgbvU.jpg',
  '/Images/Home/G-ow-qjWkAACIXv.jpg',
  '/Images/Home/G-qGG6Na0AAAg9z.jpg'
]

const currentIndex = ref(0)
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 3000) // changes every 3 seconds
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<template>
    <div class="image-viewer">
        <img :src="images[currentIndex]" alt="owl" />
    </div>
</template>

<style scoped>
.image-viewer {
    width: 500px;
    height: 500px;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid rgba(255,255,255,0.3);
    backdrop-filter: blur(6px);
    display: block;
    align-items: center;
    justify-content: center;
}

.image-viewer img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
