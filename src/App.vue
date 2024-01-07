<script setup lang="ts">
</script>

<template>
  <div class="app">
    <div class="components">
      <RouterView />
    </div>
  </div>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
* {
  margin: 0;
  padding: 0
}

html, body {
  font-family: 'Roboto', sans-serif;
}

#app {
  font-family: 'Roboto', sans-serif;
}

.app {
  height: 100vh;
  background-color: #F3F3F4;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  padding-right: 15%;
  padding-left: 15%;
}

.components {
  border: 2px solid lightgray;
  background-color: white;
  height: 90%;
  border-radius: 10px;
}
</style>