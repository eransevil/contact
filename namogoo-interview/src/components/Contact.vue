<template>
  <section>
    <div class="card">
      <img
        class="contact-img"
        :class="[
          contactObj.gender === 'male' ? 'male-border' : 'female-border',
        ]"
        :src="contactObj.picture.thumbnail"
      />
      <div class="inner-card-container">
        <div class="row">
          <span class="cell"
            >{{ contactObj.name.title }} {{ contactObj.name.first }}
            {{ contactObj.name.last }}</span
          >
        </div>
        <div class="row">
          <a class="cell" :href="'mailto:' + contactObj.email">
            {{ contactObj.email }}
          </a>
        </div>
        <div class="btn-container">
          <button @click="isMoreInfoModalOpen = true" class="btn more-info-btn">
            More information
          </button>
          <button class="btn delete-btn" @click="isDeleteModalOpen = true">
            Delete
          </button>
        </div>
        <div
          @click="isDeleteModalOpen = false"
          class="modal-container"
          v-if="isDeleteModalOpen"
        >
          <DeleteModal
            class="modal"
            @closeModal="isDeleteModalOpen = false"
            @deleteContact="deleteContact"
          />
        </div>
        <div
          @click="isMoreInfoModalOpen = false"
          class="modal-container"
          v-if="isMoreInfoModalOpen"
        >
          <ContactModal
            class="modal"
            @closeModal="isMoreInfoModalOpen = false"
            :contactObj="contactObj"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ContactModal from "./MoreInfoModal.vue";
import DeleteModal from "./DeleteModal.vue";
import { contactService } from "../../service/contact.service";

export default {
  props: {
    contactObj: Object,
  },
  data() {
    return {
      isDeleteModalOpen: false,
      isMoreInfoModalOpen: false,
    };
  },

  methods: {
    async deleteContact() {
      //delete the contact from the "DB" and remove it from the local state
      console.log("this.contactObj._id", this.contactObj._id);
      await contactService.remove(this.contactObj._id);
      this.$emit("contactDelete", this.contactObj._id);
      this.isDeleteModalOpen = false;
    },
  },
  components: {
    DeleteModal,
    ContactModal,
  },
};
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  padding: 20px;
  width: 300px;
  margin: 12px;
}
.contact-img {
  align-self: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.row {
  width: 290px;
  margin: 0 auto;
}

.inner-card-container {
  padding: 20px 0px;
}

.cell-title {
  font-weight: 600;
}

.male-border {
  border: 2px solid red;
}

.female-border {
  border: 2px solid green;
}
.more-info-btn {
  background-color: #04aa6d;
  margin-inline-end: 2px;
}
.delete-btn {
  background-color: #e71313;
  margin-inline-start: 2px;
}
.btn-container {
  display: flex;
}

.btn-container .btn {
  padding: 10px 20px;
}

.modal-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-top: 50px;
  z-index: 1;
  left: 0;
  top: 0;
}

.modal {
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px,
    rgb(60 64 67 / 15%) 0px 1px 3px 1px;
  z-index: 2;
  position: fixed;
  top: 30%;
  width: 30%;
  overflow: auto;
  background-color: #fefefe;
  padding: 10px 20px 20px;
  border-radius: 12px;
  left: 35%;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 50%;
}
</style>