<script setup lang="ts">
import { defineEmits, reactive, toRefs, computed } from 'vue';

interface ContactArray {
  type: string
  contact_info: string
}

const data = reactive({
  name: "" as string,
  contacts: [] as ContactArray[],
  contactInfo: '' as string,
  types: [
    'whatsapp',
    'phone',
    'email'
  ],
  typeSelected: '' as string
});

const disabledCreatePeople = computed(() => {
  return !contacts.value.length || !name.value ? true : false
})

const emit = defineEmits(['createPeople'])

function addContact() {
  const hasContact = contacts.value.find((contact) => contact.contact_info === contactInfo.value)

  if (hasContact) {
    return
  }

  if (typeSelected.value && contactInfo.value) {
    contacts.value.push({
      type: typeSelected.value,
      contact_info: contactInfo.value
    })
    typeSelected.value = ''
    contactInfo.value = ''
  }
}

function removeContact(index: number) {
  contacts.value.splice(index, 1);
}

function createPeople() {
  emit('createPeople', {
    name: name.value,
    contacts: contacts.value
  })
}

const { name, contacts, types, typeSelected, contactInfo } = toRefs(data);
</script>

<template>
  <div class="create-people">
    <div class="form">
      <input type="text" class="people-name form-input" placeholder="People Name" v-model="name">
      <div class="contacts">
        <select class="type-contact form-select" placeholder="Type Contact" v-model="typeSelected">
        <option value="" disabled selected>Select Your Type</option>
          <option v-for="item in types" :key="item" :value="item">
            {{ item }}
          </option>
      </select>
        <input type="text" class="contact-value form-input" placeholder="Contact Info" v-model="contactInfo">
        <button class="search-button" @click="addContact">Add Contact</button>
      </div>
      <button class="create-people-button"
      :disabled="disabledCreatePeople"
      @click="createPeople">
        Create People
      </button>
    </div>
    <div class="contacts-cards" v-if="contacts.length">
      <div class="card" v-for="(contact, index) in contacts" :key="index">
        <span>Type: {{ contact.type }}</span>
        <span>{{ contact.contact_info }}</span>
        <span class="remove" @click="removeContact(index)">❌</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-input {
  border-radius: 5px;
  border: 1px solid lightgray;
  width: 20rem;
  height: 1.5rem;
  padding: .5rem;
}

.form-select {
  border-radius: 5px;
  border: 1px solid lightgray;
  width: 20rem;
  height: 100%;
}

.people-name {
  width: auto;
}
.form {
  display: grid;
  gap: 10px;
  grid-template-rows: repeat(2, 1fr);
}
.contacts {
  display: flex;
  align-items: center;
  gap: 10px;
}
.search-button {
  border-radius: 5px;
  border: 1px solid #4B4BA0;
  height: 100%;
  width: 20%;
  cursor: pointer;
  color: white;
  background-color: #4B4BA0;
}
.contacts-cards {
  gap: 20px;
  margin-top: 1.3rem;
  display: grid;
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

.remove{
  cursor: pointer;
  position: absolute;
  right: 9px;
  top: 9px;
}

.create-people-button {
  border-radius: 5px;
  border: 1px solid #4ba04b;
  height: 2rem;
  cursor: pointer;
  color: white;
  background-color: #4ba04b;
}
.create-people-button:disabled {
  border: 1px solid #4ba04b7a;
  background-color: #4ba04b7a;
}
</style>