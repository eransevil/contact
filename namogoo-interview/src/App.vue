<template>
  <div id="app">
    <AppHeader :contacts="contactsToShow" />
    <div class="hero full main-layout" > </div>
    <div class="main-layout">
      <input
        v-if="contacts && contacts.length"
        v-model="searchValue"
        class="search-input"
        type="search"
        placeholder="Search..."
      />
      <ContactsList
        v-if="contactsToShow && contactsToShow.length"
        class="main-layout"
        :contacts="contactsToShow"
        @contactDelete="contactDelete"
      />
      <div v-else>
        <h3>You don't have contacts yet, try to add some</h3>
      </div>
      <button @click="addContact()" class="add-btn">ADD</button>
    </div>

    <footer
      class="main-layout footer full"
      :class="[contactsToShow && contactsToShow.length ? '' : 'fixed']"
    >
      <span class="footer-credit"> &copy; Eran Sevil</span>
    </footer>
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import ContactsList from "./components/ContactsList.vue";
import { contactService } from "../service/contact.service.js";
export default {
  name: "App",
  data() {
    return {
      contacts: [],
      searchValue: "",
    };
  },
  methods: {
    async fetchContacts() {
      //fetch the contact from "DB"
      this.contacts = await contactService.query(true);
      console.log("contacts", this.contacts);
    },

    async addContact() {
      const res = await fetch("https://randomuser.me/api");
      const contactRes = await res.json();
      this.contacts.push(contactRes.results[0]);
      await contactService.save(contactRes.results[0]);
    },
    contactDelete(contactId) {
      //delete the contact from the local state
      const idx = this.contacts.findIndex(
        (contact) => contact._id === contactId
      );
      this.contacts.splice(idx, 1);
      // this.fetchContacts();
    },
  },
  computed: {
    contactsToShow() {
      let tempContacts = this.contacts; //Do not make side effect in computed
      tempContacts = tempContacts.filter(
        (contact) =>
          contact.name.first
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          contact.name.last
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
      );
      return tempContacts.sort((contactA, contactB) =>
        contactA.name.first > contactB.name.first
          ? 1
          : contactB.name.first > contactA.name.first
          ? -1
          : 0
      );
    },
  },
  components: {
    AppHeader,
    ContactsList,
  },
  created() {
    this.fetchContacts();
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}
body {
  scroll-behavior: smooth;
  box-sizing: border-box;
  margin: 0;
  font-size: 18px;
  line-height: 1.43;
  color: #484848;
  background-color: rgb(243, 241, 241);
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0.1rem;
  display: block;
}

.hero {
  margin-bottom: 40px;
  height: 60vh;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.123), rgba(0, 0, 0, 0.178)),
    url(https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
}

.main-layout {
  display: grid;
  grid-template-columns: minmax(2rem, 1fr) minmax(auto, 1100px) minmax(
      2rem,
      1fr
    );
}
.main-layout > * {
  grid-column: 2;
}

.main-layout > .full {
  grid-column: 1/-1;
}
.add-btn {
  cursor: pointer;
  width: 170px;
  padding: 13px 33px;
  background: #ffdf5a;
  border: 2px solid black;
  border-radius: 40px;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.1em;
  margin-left: 8px;
  margin-bottom: 20px;
  opacity: 0.8;
}
.add-btn:hover {
  opacity: 1;
}
.search-input {
  width: 250px;
  padding: 10px;
  margin: 0px 16px 10px 12px;
  background: rgb(241, 236, 236);
  font-size: 1rem;
  border: none;
  outline: none;
  cursor: text;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border-radius: 5px;
}
.footer {
  height: 45px;
  bottom: 0;
  background: rgb(221, 221, 221);
  position: relative;
  width: 100%;
}
.footer-credit {
  display: flex;
  align-self: center;
  justify-self: center;
}
.fixed {
  position: fixed;
}
</style>
