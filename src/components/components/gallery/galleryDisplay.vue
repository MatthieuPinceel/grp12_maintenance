<script setup>
import { useItemStore } from '../../../stores/itemStore.js';
import photo from './photo.vue';
import { onMounted, ref } from 'vue';

const store = useItemStore();
const photos = ref([]);

// Call the store action to load all items and populate photos array
const loadPhotos = async () => {
  await store.getAllItems();
  photos.value = store.itemList.map(item => ({
    src: item.itemImg,
    alt: item.itemDescription
  }));
};

// Delete the photo from the store and the backend
const DeletePhoto = (index) => {
  const photoToDelete = photos.value[index];
  store.deleteItem(photoToDelete.src);
  photos.value.splice(index, 1);
};

onMounted(() => {
  loadPhotos();
});

</script>

<template>
  <div class="gallery-container">
    <div class="gallery-grid">
      <div v-for="(photo, index) in photos" :key="index" class="photo-wrapper">
        <photo
          :key="index"
          :src="photo.src"
          :alt="photo.alt"
        />
        <div class="delete-photo-btn-container">
          <button class="delete-photo-btn" @click="DeletePhoto(index)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.gallery-container {
  max-width: 1200px;
  margin-top: 100px;
  padding: 0 20px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.photo-wrapper {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.photo-wrapper :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Conteneur du bouton */
.delete-photo-btn-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;
  justify-content: center;

  background: rgba(0, 0, 0, 0.5);
  
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.3s ease;
}

/* Apparition au survol */
.photo-wrapper:hover .delete-photo-btn-container {
  transform: translateY(0);
  opacity: 1;
}

/* Bouton */
.delete-photo-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 22px;
  padding: 10px;
  cursor: pointer;
}

.delete-photo-btn:hover {
  color: #ff4d4d;
}


</style>
