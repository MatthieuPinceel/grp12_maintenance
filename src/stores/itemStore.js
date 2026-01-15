import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useItemStore = defineStore('item', () => {
  // State
  const items = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Computed
  const itemList = computed(() => items.value);
  const itemCount = computed(() => items.value.length);
  
  // Computed pour filtrer par tag
  const getItemsByTag = (tagName) => computed(() => 
    items.value.filter(item => item.tagName === tagName)
  );
  
  // Computed pour filtrer par utilisateur
  const getItemsByUser = (userName) => computed(() => 
    items.value.filter(item => item.userName === userName)
  );

  // Actions
  const getAllItems = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Appel au endpoint pour obtenir tous les items
      const response = await axios.get('http://localhost:3000/api/items');
      
      items.value = response.data;
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des items';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const getItemById = async (itemID) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(`http://localhost:3000/api/items/${itemID}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Item non trouvé';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const createItem = async (itemData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post('http://localhost:3000/api/items/create', itemData);
      items.value.push(response.data);
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la création';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const updateItem = async (itemID, itemData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.put(`http://localhost:3000/api/items/${itemID}`, itemData);
      
      // Met à jour l'item dans la liste
      const index = items.value.findIndex(item => item.itemID === itemID);
      if (index !== -1) {
        items.value[index] = response.data;
      }
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la mise à jour';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteItem = async (itemID) => {
    loading.value = true;
    error.value = null;

    try {
      await axios.delete(`http://localhost:3000/api/items/${itemID}`);
      
      // Supprime l'item de la liste
      items.value = items.value.filter(item => item.itemID !== itemID);
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la suppression';
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    // State
    items,
    loading,
    error,
    
    // Computed
    itemList,
    itemCount,
    getItemsByTag,
    getItemsByUser,
    
    // Actions
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem

  };});
