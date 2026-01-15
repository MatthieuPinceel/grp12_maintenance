<script setup>
import photo from './photo.vue';

const photos = [
  { src: '/Images/Home/G-jv7WCbQAEgbvU.jpg', alt: 'Owl 1' },
  { src: '/Images/Home/G-ow-qjWkAACIXv.jpg', alt: 'Owl 2' },
  { src: '/Images/Home/G-qGG6Na0AAAg9z.jpg', alt: 'Owl 3' },

  { src: '/Images/Home/G-juTqxakAAJ4b8.jpg', alt: 'Owl 1' },
  { src: '/Images/Home/G-jVfmPbQAE7NS3.jpg', alt: 'Owl 2' },
  { src: '/Images/Home/G-lZYVabQAISDKD.jpg', alt: 'Owl 3' },
  { src: '/Images/Home/G-rGDsWbQAQUh3n.jpg', alt: 'Owl 1' },
  { src: '/Images/Home/G7_z9KCagAg2svG.jpg', alt: 'Owl 2' },
  { src: '/Images/Home/G7QymbsbcAAQXeF.jpg', alt: 'Owl 3' },
  { src: '/Images/Home/G8hUlTuacAA5EOn.jpg', alt: 'Owl 1' },
  { src: '/Images/Home/G8ToRBubkAArdin.jpg', alt: 'Owl 2' },
  { src: '/Images/Home/G9cyErWbcAAkxXU.jpg', alt: 'Owl 1' },
  { src: '/Images/Home/G9ZjT1UaYAMk8I0.jpg', alt: 'Owl 2' },
]
</script>

<template>
  <div class="gallery-container">

    <div class="gallery-grid">
      <photo 
        v-for="(photo, index) in photos" 
        :key="index"
        :src="photo.src"
        :alt="photo.alt"
      />
    </div>

  </div>
</template>

<style scoped>
.gallery-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>
