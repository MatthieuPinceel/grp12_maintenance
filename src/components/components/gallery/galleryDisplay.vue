<script setup>
import { useItemStore } from '../../../stores/itemStore.js';
import photo from './photo.vue';
import { onMounted, ref } from 'vue';

const store = useItemStore();
const photos = ref([]);

const loadPhotos = async () => {
  await store.getAllItems();
  photos.value = store.itemList.map(item => ({
    src: item.itemImg,
    alt: item.itemDescription
  }));
};

onMounted(() => {
  loadPhotos();
});

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
