<template>
  <div class="more-info-modal-content">
    <span class="x-btn" @click="closeModal()"> &times;</span>
    <img
      class="contact-img"
      :class="[contactObj.gender === 'male' ? 'male-border' : 'female-border']"
      :src="contactObj.picture.thumbnail"
    />
    <h3>
      {{ contactObj.name.title }} {{ contactObj.name.first }}
      {{ contactObj.name.last }}
    </h3>
    <span
      >{{ contactObj.location.city }}, {{ contactObj.location.country }}
    </span>
    <span>{{ contactObj.phone }} </span>
    <a class="cell" :href="'mailto:' + contactObj.email">
      {{ contactObj.email }}
    </a>
    <span> {{ formetDate() }} ({{ contactObj.dob.age }}) </span>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "contactModal",
  props: {
    contactObj: Object,
  },
  methods: {
    formetDate() {
      return moment(this.contactObj.dob.date).format("MMM Do YY");
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style>
.more-info-modal-content {
  display: flex;
  flex-direction: column;
  z-index: 2;
}
.x-btn {
  color: rgb(199, 11, 11);
  cursor: pointer;
  opacity: 0.8;
  font-size: 2.2rem;
}
.x-btn:hover {
  opacity: 1;
  color: red;
}
</style>