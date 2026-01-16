import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

/**
 * Item Management Store (Pinia)
 * 
 * Manages inventory items, gallery content, and item-related operations.
 * Provides CRUD operations for maintenance items with filtering capabilities.
 * 
 * Features:
 * - Fetch and manage item collection
 * - Filter items by tag or user
 * - Full CRUD operations (Create, Read, Update, Delete)
 * - Error handling and loading states
 * 
 * @module itemStore
 */
export const useItemStore = defineStore('item', () => {
  // ============================================
  // STATE: Item collection data
  // ============================================
  
  const items = ref([]); // Collection of all maintenance items
  const loading = ref(false); // Loading state for async operations
  const error = ref(null); // Error message from failed operations

  // ============================================
  // COMPUTED PROPERTIES: Derived state
  // ============================================
  
  const itemList = computed(() => items.value); // Current items array
  const itemCount = computed(() => items.value.length); // Number of items in collection
  
  /**
   * Factory function to filter items by tag name
   * 
   * @param {string} tagName - Tag name to filter by
   * @returns {Computed<Array>} Filtered items matching the tag
   */
  const getItemsByTag = (tagName) => computed(() => 
    items.value.filter(item => item.tagName === tagName)
  );
  
  /**
   * Factory function to filter items by user name
   * 
   * @param {string} userName - User name to filter by
   * @returns {Computed<Array>} Filtered items created by the user
   */
  const getItemsByUser = (userName) => computed(() => 
    items.value.filter(item => item.userName === userName)
  );

  // ============================================
  // ACTIONS: Item operations
  // ============================================

  /**
   * Fetch all items from the server
   * 
   * Retrieves complete list of items with associated tag and user information.
   * Populates items state with result from GET /api/items endpoint.
   * 
   * @async
   * @returns {Promise<boolean>} True if successful, false otherwise
   */
  const getAllItems = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Fetch all items from backend API
      const response = await axios.get('http://localhost:3000/api/items');
      
      items.value = response.data;
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load items';
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetch single item by ID
   * 
   * Retrieves detailed information for a specific item from the server.
   * 
   * @async
   * @param {number} itemID - Unique identifier of the item
   * @returns {Promise<Object|null>} Item object if found, null otherwise
   */
  const getItemById = async (itemID) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(`http://localhost:3000/api/items/${itemID}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Item not found';
      return null;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Create new item on the server
   * 
   * Sends item data to backend and adds created item to local collection.
   * Requires authentication (JWT token in Authorization header).
   * 
   * @async
   * @param {Object} itemData - Item data to create
   * @param {string} itemData.itemDescription - Item description
   * @param {number} itemData.tagID - Associated tag ID
   * @param {string} [itemData.itemImg] - Optional image path
   * @returns {Promise<boolean>} True if successful, false otherwise
   */
  const createItem = async (itemData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post('http://localhost:3000/api/items/create', itemData);
      items.value.push(response.data);
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create item';
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Update existing item on the server
   * 
   * Sends updated item data to backend and refreshes local item state.
   * Locates item by ID and updates corresponding entry in collection.
   * 
   * @async
   * @param {number} itemID - Unique identifier of item to update
   * @param {Object} itemData - Updated item data
   * @returns {Promise<boolean>} True if successful, false otherwise
   */
  const updateItem = async (itemID, itemData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.put(`http://localhost:3000/api/items/${itemID}`, itemData);
      
      // Update item in local collection
      const index = items.value.findIndex(item => item.itemID === itemID);
      if (index !== -1) {
        items.value[index] = response.data;
      }
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update item';
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Delete item from the server
   * 
   * Removes item from backend database and removes from local collection.
   * Filters out deleted item from items array by ID.
   * 
   * @async
   * @param {number} itemID - Unique identifier of item to delete
   * @returns {Promise<boolean>} True if successful, false otherwise
   */
  const deleteItem = async (itemID) => {
    loading.value = true;
    error.value = null;

    try {
      await axios.delete(`http://localhost:3000/api/items/${itemID}`);
      
      // Remove item from local collection
      items.value = items.value.filter(item => item.itemID !== itemID);
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete item';
      return false;
    } finally {
      loading.value = false;
    }
  };

  // ============================================
  // EXPORTS: Public API
  // ============================================

  return {
    // State exports
    items,
    loading,
    error,
    
    // Computed properties exports
    itemList,
    itemCount,
    getItemsByTag,
    getItemsByUser,
    
    // Action exports
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
  };
});
