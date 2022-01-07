<template>
  <header class="main-layout header-container">
    <div class="inner-header-container">
      <img
        class="logo-image"
        :src="require(`@/assets/images/contactLogo.png`)"
      />
      <span v-if="contacts && contacts.length" class="contacts-num"
        >You have {{ contacts.length }} Contacts from
        {{ numberOfContrires }} different countries
      </span>
      <h3 class="contacts-num" v-else> CONTACT MISSION</h3>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  props: ["contacts"],
  computed: {
    numberOfContrires() { //reduce the number of countries
      const contriesObj = this.contacts.reduce((acc, currVal) => {
        if (!acc[currVal.location.country]) acc[currVal.location.country] = 0;
        acc[currVal.location.country]++;
        return acc;
      }, {});
      return Object.keys(contriesObj).length;
    },
  },
};
</script>

<style>
.logo-image {
  width: 75px;
  height: 78px;
  margin: 2px 0px;
}
.header-container {
  background-color: #e1b500;
  height: 80px;
  top: 0;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  position: sticky;
}
.inner-header-container {
  display: flex;
}
.contacts-num {
  align-self: center;
  margin: 0 auto;
}
</style>