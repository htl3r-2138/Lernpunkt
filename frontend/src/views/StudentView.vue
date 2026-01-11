<template>
  <div class="wrapper">
    <nav>
      <div>
        <Logo></Logo>
      </div>
      <div>
        <Searchbar></Searchbar>
      </div>
      <div>
        <SettingsButton></SettingsButton>
      </div>
    </nav>
    <Banner/>
    <main>
      <h1>Booked Tutors</h1>
        <Tile name="Maximilian Popek" :rating="4" :reviews="12" grade="1st Grade" :price="25" location="Aula"
          nextSess="02.11.2025" subject="AM" />
      <h1>Recommended Tutors for you</h1>
    </main>
  </div>
</template>

<script setup>
import Tile from "@/components/Tile.vue";
import Logo from "@/components/Logo.vue";
import Searchbar from "@/components/Searchbar.vue";
import SettingsButton from "@/components/SettingsButton.vue";
import Banner from "@/components/Banner.vue";
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  width: 100%;
  color: black;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem
}

main {
  padding-left: 60px;
}
</style>
