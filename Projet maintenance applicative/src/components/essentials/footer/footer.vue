<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-text">© 2024 Owl Viewer — Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;

  position: fixed;
  bottom: 0;
  left: 0;

  padding: 20px 0;

  background: rgb(92, 83, 83);
  backdrop-filter: blur(6px);
  border-top: 1px solid rgba(255,255,255,0.2);
}

.footer-content {
  max-width: 1100px;
  text-align: center;
  padding: 0 20px;
  justify-content: left;
}

.footer-text {
  color: white;
  font-size: 14px;
  opacity: 0.9;
}
</style>
