<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

interface ContactArray {
  id: number
  type: string
  contact_info: string
  created_at: string
  updated_at: string | null
}

interface PeopleCardProps  {
  id: number
  name: string
  contacts: ContactArray[]
  created_at: string
  updated_at: string | null
}

const router = useRouter()

const props = defineProps<{
  people: PeopleCardProps
}>()

const emit = defineEmits(['deletePeople'])

function deletePeople(peopleId: number) {
    emit('deletePeople', peopleId);
}

function viewPeople() {
  router.push({
    name: 'view',
    params: {
      id: props.people.id
    }
  })
}

function editPeople() {
  router.push({
    name: 'edit',
    params: {
      id: props.people.id
    }
  })
}
</script>

<template>
  <div class="people-card">
    <span>
      {{ people.name }}
    </span>
    <div class="actionscard">
      <div class="edit action" @click="editPeople">✏️</div>
      <div class="view action" @click="viewPeople">👀</div>
      <div class="remove action" @click="deletePeople(people.id)">❌</div>
    </div>
  </div>
</template>

<style scoped>
  .people-card {
    display: flex;
    gap: 0px;
    flex-direction: column;
    background-color: #fff;
  }

  .people-card > span {
    border: 2px solid lightgray;
    border-bottom: none;
    border-radius: 5px 5px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .5rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    height: 50px;
  }
  .actionscard {
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% /3);
    height: 30px;
  }
  .edit{
    background-color: lightskyblue;
    border-radius: 0px 0px 0px 3px;
  }
  .view{
    background-color: green;
  }
  .remove {
    background-color: #7A545E;
    border-radius: 0px 0px 5px 0px;
  }
</style>