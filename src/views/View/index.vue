<script setup lang="ts">
import { onMounted, ref} from 'vue'
import HttpServices from '../../services/HttpServices';
import { useRoute, useRouter } from 'vue-router';

interface ContactArray {
  id: number
  type: string
  contact_info: string
  created_at: string
  updated_at: string | null
}

export interface People {
  id: number
  name: string
  contacts: ContactArray[]
  created_at: string
  updated_at: string | null
}

const http = new HttpServices();
const route = useRoute()
const router = useRouter()

const people = ref({} as People);

onMounted(async () => {
  const resultPeoples = await getSpecificPeople()
  people.value = resultPeoples.data.people
})

async function getSpecificPeople() {
  try {
    return http.getSpecificPeople(Number(route.params.id))
  } catch (e) {
    return {
      data: {
        peoples: {}
      }
    }
  }
}

function goToHome() {
  router.push({
    name: 'home'
  })
}

</script>

<template>
  <div class="view">
    <div class="title">
      <h1>People: {{ people.name }}</h1>
      <button @click="goToHome">Home</button>
    </div>
    <hr class="division" />
    <h1>Contacts</h1>
    <div class="contacts-cards">
      <div class="card" v-for="(contact, index) in people.contacts" :key="index">
        <span>Type: {{ contact.type }}</span>
        <span>{{ contact.contact_info }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .view {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

.division {
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  border: 1px solid lightgray;
  width: 100%;
}
.contacts-cards {
  gap: 20px;
  margin-top: 1.3rem;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
}
.card {
  position: relative;
  gap: 5px;
  border-radius: 5px;
  border: 1px solid lightgray;
  height: 4rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
