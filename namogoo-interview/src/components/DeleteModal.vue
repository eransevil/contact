<template>
  <div class="delete-modal-contact">
    <h1>Delete Contact</h1>
    <p>Are you sure you want to delete this contcat?</p>

    <div class="btns-container">
      <button @click="closeModal()" class="btn cancelbtn">Cancel</button>
      <button @click="deleteContact()" class="btn deletebtn">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  methods: {
    deleteContact() {
      this.$emit("deleteContact");
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style>
.btn {
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.btns-container {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}

.btns-container > * {
  width: 200px;
}

.btn:hover {
  opacity: 1;
}

.cancelbtn {
  background-color: #ccc;
  color: black;
}

.deletebtn {
  background-color: #f44336;
}

.delete-modal-contact {
  padding: 16px;
  text-align: center;
}

</style>