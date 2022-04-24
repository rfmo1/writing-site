<template><v-container></v-container></template>

<script>
export default {
  name: 'LogoutPage',

  mounted() {
    this.$auth.$storage.removeCookie('loggedIn');
    window.location.replace('/login');
  },
};
</script>
