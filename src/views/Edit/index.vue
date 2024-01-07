<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FormEditPeople from './Components/FormEditPeople.vue'
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
const router = useRouter();
const route = useRoute();
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

function editPeople(people: People) {
  http.editPeople(people.id, people).then(() => {
    router.push({
      name: 'home'
    })
  })
}

function deleteContact(contactId: number) {
  http.deleteContact(contactId).then(async () => {
    const resultPeoples = await getSpecificPeople()
    people.value = resultPeoples.data.people
  })
}

function goToHome() {
  router.push({
    name: 'home'
  })
}

</script>

<template>
  <div class="create">
    <div class="title">
      <h1>Create Contact</h1>
      <button @click="goToHome">Home</button>
    </div>
    <div class="form" v-if="people.id">
      <FormEditPeople
        :people="people"
        @editPeople="editPeople"
        @deleteContact="deleteContact"
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
