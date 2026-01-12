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
    <Banner />
    <main>
      <h1>Booked Tutors</h1>
      <div class="booked-wrapper">
        <BookedTutorTile
          name="Maximilian Popek"
          :rating="4"
          :reviews="12"
          grade="1st Grade"
          :price="25"
          location="Aula"
          nextSess="02.11.2025"
          subject="AM"
        />
        <BookedTutorTile
          name="Maximilian Popek"
          :rating="4"
          :reviews="12"
          grade="1st Grade"
          :price="25"
          location="Aula"
          nextSess="02.11.2025"
          subject="AM"
        />
        <BookedTutorTile
          name="Maximilian Popek"
          :rating="4"
          :reviews="12"
          grade="1st Grade"
          :price="25"
          location="Aula"
          nextSess="02.11.2025"
          subject="AM"
        />
      </div>
      <h1>Recommended Tutors for you</h1>
      <div class="recommended-wrapper">
        <RecommendedTutorTile
          name="Anna Schmidt"
          :rating="5"
          :reviews="30"
          grade="2nd Grade"
          :price="30"
          subject="AM"
        />
        <RecommendedTutorTile
          name="Lukas Meyer"
          :rating="4"
          :reviews="20"
          grade="3rd Grade"
          :price="20"
          subject="PH"
        />
        <WhenClickedOnBook />
      </div>
    </main>
  </div>
</template>

<script setup>
import BookedTutorTile from "@/components/Tiles/BookedTutorTile.vue";
import RecommendedTutorTile from "@/components/Tiles/RecommendedTutorTile.vue";
import WhenClickedOnBook from "@/components/Tiles/WhenClickedOnBook.vue";
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
  padding: 2rem 4rem;
}

main {
  padding-left: 60px;
}

.booked-wrapper,
.recommended-wrapper {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}
</style>
