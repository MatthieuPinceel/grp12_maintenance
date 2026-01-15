<script setup>
const numBlocks = 10; 
</script>

<template>
    <div class="container-gallery">
        <div class="column-photo">
            <div 
                class="test" 
                v-for="n in numBlocks" 
                :key="n"
            ></div>
        </div>
    </div>
</template>

<style scoped>

.column-photo {
  display: flex;
  flex-wrap: wrap;
}

.container-gallery {
    min-width: 1000px;
    height: 100%;
    column-count: 4;
    column-gap: 20px;
}

.test {
  width: 100%;
  height: 250px;
  background: black;
  margin-bottom: 20px;
  border-radius: 10px;
  display: inline-block;
}
</style>
