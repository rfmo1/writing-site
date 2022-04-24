<template>
  <v-sheet min-height="85vh" rounded="lg" class="pt-6">
    <form class="mx-15">
      <h2>Log in</h2>
      <br />
      <p>Please enter admin password:</p>
      <v-row class="mx-15 mt-1">
        <v-text-field v-model="password" type="password" label="Password" class="mr-5"></v-text-field>
        <v-btn class="mt-2" @click="submit"> Submit </v-btn>
      </v-row>
    </form>
  </v-sheet>
</template>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      password: '',
    };
  },

  beforeMount() {
    const jwt = this.$auth.$storage.getCookie('loggedIn');
    if (jwt) this.$router.push('/');
  },

  methods: {
    async submit() {
      let res = await this.$axios
        .post('/auth/login', { username: 'admin', password: this.password })
        .catch(function (error) {
          console.log(error);
        });

      this.$auth.$storage.setCookie('loggedIn', res.data.access_token);
      window.location.reload();
    },
  },
};
</script>
