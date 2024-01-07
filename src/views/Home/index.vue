<script setup lang="ts">
import {ref, onMounted} from 'vue'
import HttpServices from '../../services/HttpServices';
import PeopleCards from './Components/PeopleCards.vue'
import { useRouter } from 'vue-router';

interface ContactArray {
  id: number
  type: string
  contact_info: string
  created_at: string
  updated_at: string | null
}

export interface PeopleArray {
  id: number
  name: string
  contacts: ContactArray[]
  created_at: string
  updated_at: string | null
}
const router = useRouter();
const http = new HttpServices()
const peoples = ref([] as PeopleArray[]);

onMounted(async () => {
  const resultPeoples = await getAllPeoples()
  peoples.value = resultPeoples.data.peoples
})

async function getAllPeoples() {
  try {
    return http.getAllPeoples()
  } catch (e) {
    return {
      data: {
        peoples: []
      }
    }
  }
}

async function deletePeople(peopleId: number) {
    http.deletePeople(peopleId).then(async () => {
      const resultPeoples = await getAllPeoples()
      peoples.value = resultPeoples.data.peoples
    })
}

function goToCreatePage() {
  router.push({
    name: 'create'
  })
}

</script>

<template>
  <div class="home">
    <div class="title">
      <h1>Contact List</h1>
      <button @click="goToCreatePage">Create People</button>
    </div>
    <hr class="division" />
    <div class="home-cards">
      <PeopleCards v-for="people in peoples"
        :key="people.id"
        :people="people"
        @deletePeople="deletePeople"
        />
    </div>

  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.home {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.division {
  margin-top: 1.2rem;
  border: 1px solid lightgray;
  width: 100%;
}
.home-cards{
  margin-top: 1.2rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

button {
  border-radius: 10px;
  border: 1px solid #4ba04b;
  height: 2rem;
  cursor: pointer;
  color: white;
  width: 7rem;
  background-color: #4ba04b;
}
</style>