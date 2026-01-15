<script setup>
import imageViewer from '@/components/components/imageViewer/imageViewer.vue';
import photo from '@/components/components/gallery/photo.vue';
</script>

<template>
  <div class="home-container">
    <div class="home-intro-container">
      
      <div class="home-text">
        <h1>Welcome to the owl viewer website</h1>
        <p>
          This website is the place for all owl lovers out there to congregate
          and upload images of owls for everyone to see! Check out our gallery
          and see for yourself the wonders of owls.
        </p>

        <div class="background-highlight background-highlight-1"></div>
        <div class="background-highlight background-highlight-2"></div>
      </div>

      <imageViewer />

    </div>

    <div class="separation-bar"></div>

    <photo />
  </div>
  

  
</template>

<style scoped>
.home-container {
  display: table-column;
}

.home-intro-container {
  display: flex;
  flex-direction: row-reverse;
  gap: 200px;
  justify-content: center; 
  align-items: center;     
}

.home-text {
    position: relative;
    max-width: 350px;
    padding: 20px;
    z-index: 1;
}

.background-highlight {
    position: absolute;
    height: 100%;
    width: 100%;
}

.background-highlight-1 {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: rgb(137, 124, 119);
}

.background-highlight-2 {
    top: 40px; 
    left: 40px;
    right: 40px;
    bottom: 40px;
    z-index: -2;
    background-color: rgb(95, 73, 77);
}
</style>
