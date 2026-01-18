<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="brand">
        <span class="logo">Lernpunkt</span>
        <p class="tagline">Where knowledge meets connection</p>
      </div>

      <div class="links">
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Privacy</a>
        <a href="#">Imprint</a>
      </div>
    </div>

    <div class="bottom">
      © {{ new Date().getFullYear() }} Lernpunkt. All rights reserved.
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: 2rem 60px 2rem;
  margin-top: auto;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.brand {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.logo {
  font-size: 1.2rem;
  font-weight: 600;
  color: #7e52fc;
}

.tagline {
  font-size: 0.85rem;
  color: #666;
}

.links {
  display: flex;
  gap: 1.5rem;
}

.links a {
  font-size: 0.9rem;
  color: #444;
  text-decoration: none;
  transition: color 0.2s;
}

.links a:hover {
  color: #7e52fc;
}

.bottom {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: #888;
}
</style>