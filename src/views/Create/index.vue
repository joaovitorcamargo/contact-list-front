<script setup lang="ts">
import FormCreatePeople from './Components/FormCreatePeople.vue'
import HttpServices from '../../services/HttpServices';
import { useRouter } from 'vue-router';

const http = new HttpServices();
const router = useRouter();

function createPeople(data: object) {
  http.createPeople(data).then(() => {
    router.push({
      name: 'home'
    })
  })
}

</script>

<template>
  <div class="create">
    <h1>Create Contact</h1>
    <div class="form">
      <FormCreatePeople
        @createPeople="createPeople"
      />
    </div>
  </div>
</template>

<style scoped>
  .create {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .form {
    margin-top: 2rem;
  }
</style>
