<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-tabs color="grey darken-1">
        <v-tab v-for="link in links" :key="link.name" :to="link.link">
          {{ link.name }}
        </v-tab>
      </v-tabs>
      <v-btn
        color="grey lighten-3"
        max-height="15vh"
        max-width="15vw"
        style="font-size: 0.9vw"
        @click="toggleAdmin"
      >
        {{ loggedInStatus ? "Log out" : "Admin" }}
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: "Index", link: "/" },
        { name: "Search", link: "/search" },
      ],
    };
  },

  created() {
    if (this.loggedInStatus) {
      this.links.push({ name: "New Post", link: "admin/newpost" });
      this.links.push({ name: "Edit", link: "admin/edit" });
    }
  },

  computed: {
    loggedInStatus() {
      let jwt = this.$auth.$storage.getCookie("loggedIn");
      return jwt;
    },
  },

  methods: {
    toggleAdmin() {
      if (this.loggedInStatus) this.$router.push("/logout");
      else this.$router.push("/login");
    },
  },
};
</script>
