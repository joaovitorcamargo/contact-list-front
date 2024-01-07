<script setup lang="ts">
import { defineEmits, reactive, toRefs, computed, defineProps } from 'vue';

interface Contact {
  id?: number
  type: string
  contact_info: string
}

export interface People {
  id: number
  name: string
  contacts: Contact[]
  created_at: string
  updated_at: string | null
}

const props = defineProps<{
  people: People
}>()

const data = reactive({
  contacts: [] as Contact[],
  contactInfo: '' as string,
  types: [
    'whatsapp',
    'phone',
    'email'
  ],
  typeSelected: '' as string,
  currentContactEdit: {} as Contact,
  editAction: false as Boolean
});

const disabledEditPeople = computed(() => {
  return !props.people.contacts.length || !props.people.name ? true : false
})

const emit = defineEmits(['editPeople', 'deleteContact'])

function addContact() {
  const hasContact = contacts.value.find((contact) => contact.contact_info === contactInfo.value)
  const hasContactRegistered = props.people.contacts.find((value) => value.contact_info == contactInfo.value )

  if (hasContact || hasContactRegistered) {
    return
  }

  if (typeSelected.value && contactInfo.value) {
    props.people.contacts.push({
      type: typeSelected.value,
      contact_info: contactInfo.value
    })
    typeSelected.value = ''
    contactInfo.value = ''
  }
}

function removeContact(contact: Contact, index: number) {
  const hasContact = props.people.contacts.find((value) => value.id === contact.id )
  if (hasContact?.id) {
    emit('deleteContact', hasContact.id)
    return
  }
  props.people.contacts.splice(index, 1);
}

function editContact(contact: Contact) {
    currentContactEdit.value = contact
    typeSelected.value = contact.type
    contactInfo.value = contact.contact_info
    editAction.value = true;
}

function setEditContact() {
  const contactIndex = props.people.contacts.findIndex(value => value.id == currentContactEdit.value.id )
  props.people.contacts[contactIndex].contact_info = contactInfo.value
  props.people.contacts[contactIndex].type = typeSelected.value
  editAction.value = false;
  typeSelected.value = '';
  contactInfo.value = '';
}

function editPeople() {
  emit('editPeople', props.people)
}

const {  contacts, types, typeSelected, contactInfo, currentContactEdit, editAction } = toRefs(data);
</script>

<template>
  <div class="create-people">
    <div class="form">
      <input type="text" class="people-name form-input" placeholder="People Name" v-model="people.name">
      <div class="contacts">
        <select class="type-contact form-select" placeholder="Type Contact" v-model="typeSelected">
        <option value="" disabled selected>Select Your Type</option>
          <option v-for="item in types" :key="item" :value="item">
            {{ item }}
          </option>
      </select>
        <input type="text" class="contact-value form-input" placeholder="Contact Info" v-model="contactInfo">
        <button class="search-button" @click="addContact" v-if="!editAction">Add Contact</button>
        <button class="search-button" @click="setEditContact" v-if="editAction">Edit Contact</button>
      </div>
      <button class="create-people-button"
      :disabled="disabledEditPeople"
      @click="editPeople">
        Edit People
      </button>
    </div>
    <div class="contacts-cards" v-if="people.contacts.length">
      <div class="card" v-for="(contact, index) in people.contacts" :key="index">
      <span class="edit" @click="editContact(contact)">✏️</span>
        <span>Type: {{ contact.type }}</span>
        <span>{{ contact.contact_info }}</span>
        <span class="remove" @click="removeContact(contact, index)">❌</span>
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

.edit{
  cursor: pointer;
  position: absolute;
  left: 9px;
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