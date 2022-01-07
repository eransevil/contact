<template>
  <div class="contacts-list-container">
    <Contact
      v-for="contactObj in contacts"
      :key="contactObj._id"
      :contactObj="contactObj"
      @contactDelete="contactDelete"
    />
  </div>
</template>

<script>
import Contact from "./Contact.vue";
export default {
  name: "contacts",
  props: {
    contacts: Array,
  },
  methods: {
    contactDelete(contactId) {
      this.$emit("contactDelete", contactId);
    },
  },
  components: {
    Contact,
  },
};
</script>

<style scoped>
.contacts-list-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
</style>
