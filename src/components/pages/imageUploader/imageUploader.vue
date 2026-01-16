<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../../../stores/authStore';

const authStore = useAuthStore();

const selectedFile = ref(null);
const description = ref('');
const tagID = ref('');
const loading = ref(false);
const message = ref('');
const messageType = ref(''); // 'success' ou 'error'
const tags = ref([
  { id: 1, name: 'Owl 1' },
  { id: 2, name: 'Owl 2' },
  { id: 3, name: 'Owl 3' }
]);

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0];
};

const triggerFileInput = () => {
  document.querySelector('#file-input').click();
};

const uploadImage = async () => {
  if (!selectedFile.value || !description.value || !tagID.value) {
    message.value = 'Veuillez remplir tous les champs';
    messageType.value = 'error';
    return;
  }

  loading.value = true;
  message.value = '';

  const formData = new FormData();
  formData.append('image', selectedFile.value);
  formData.append('itemDescription', description.value);
  formData.append('tagID', tagID.value);

  try {
    const response = await axios.post(
      'http://localhost:3000/api/items/upload',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    message.value = ' Image uploaded successfully!';
    messageType.value = 'success';

    // Reset form
    selectedFile.value = null;
    description.value = '';
    tagID.value = '';
    document.querySelector('input[type="file"]').value = '';

    setTimeout(() => {
      message.value = '';
    }, 3000);
  } catch (error) {
    message.value = error.response?.data?.message || 'Erreur lors de l\'upload';
    messageType.value = 'error';
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  selectedFile.value = null;
  description.value = '';
  tagID.value = '';
  message.value = '';
  document.querySelector('input[type="file"]').value = '';
};
</script>

<template>
  <div class="upload-container">
    <div class="upload-card">
      <div class="card-header">
        <h2 class="card-title">Add image</h2>
        <p class="card-subtitle">Upload a new owl image</p>
      </div>

      <div v-if="message" :class="['upload-message', messageType]">
        {{ message }}
      </div>

      <form @submit.prevent="uploadImage" class="upload-form">
        <div class="form-group">
          <label for="file-input" class="form-label">Image (JPG, PNG, GIF...)</label>
          <div class="file-input-wrapper" @click="triggerFileInput">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              @change="handleFileSelect"
              class="file-input"
            />
            <div class="file-label">
              <span v-if="!selectedFile" class="placeholder"> 
                Click for select image
              </span>
              <span v-else class="file-name">
                ✓ {{ selectedFile.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model="description"
            class="form-input textarea"
            placeholder="Décrivez l'image (ex: Owl picture, maintenance area...)"
            rows="3"
          />
        </div>

        <div class="form-group">
          <label for="tag-select" class="form-label">Tag</label>
          <select
            id="tag-select"
            v-model="tagID"
            class="form-input"
          >
            <option value="">-- Select a tag --</option>
            <option v-for="tag in tags" :key="tag.id" :value="tag.id">
              {{ tag.name }}
            </option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="button-group">
          <button
            type="submit"
            class="upload-btn"
            :disabled="loading || !selectedFile"
          >
            <span v-if="!loading">uploaded</span>
            <span v-else>Upload...</span>
          </button>
          <button
            type="button"
            class="cancel-btn"
            @click="resetForm"
            :disabled="loading"
          >
            Annuler
          </button>
        </div>
      </form>

      <div class="info-box">
        <p>💡 <strong>Infos :</strong></p>
        <ul>
          <li>Taille max: 10 MB</li>
          <li>Format: JPG, PNG, GIF, WebP</li>
          <li>Image will be visible in the gallery</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.upload-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.card-header {
  text-align: center;
  margin-bottom: 30px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
}

.card-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.upload-message {
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 500;
  text-align: center;
}

.upload-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.upload-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.form-input {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.textarea {
  resize: vertical;
  min-height: 80px;
}

.file-input-wrapper {
  position: relative;
  cursor: pointer;
}

.file-input {
  display: none;
}

.file-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: all 0.3s;
}

.file-input-wrapper:hover .file-label {
  border-color: #667eea;
  background-color: #f0f4ff;
}

.placeholder {
  color: #999;
  font-weight: 500;
}

.file-name {
  color: #4caf50;
  font-weight: 500;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.upload-btn,
.cancel-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.upload-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.upload-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #333;
}

.cancel-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.info-box {
  background-color: #f0f4ff;
  border-left: 4px solid #667eea;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}

.info-box p {
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #333;
}

.info-box ul {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #666;
}

.info-box li {
  margin: 5px 0;
}
</style>
