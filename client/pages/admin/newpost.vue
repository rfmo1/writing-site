<template>
  <v-sheet min-height="85vh" rounded="lg" class="pa-6">
    <v-form class="mx-15 my-3">
      <v-row>
        <v-text-field v-model="title" label="Title" required></v-text-field>
      </v-row>
      <v-row>
        <v-textarea
          v-model="paragraphs"
          label="Text"
          style="text-align: justify"
          auto-grow
          full-width
          required
        ></v-textarea>
      </v-row>
      <v-row class="mt-10 ml-n6">
        <v-col>
          <v-text-field v-model="tag" label="Tags"></v-text-field>
        </v-col>
        <v-col>
          <v-btn class="mt-4" icon small @click="addTag">
            <v-icon> mdi-plus-circle </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-n2 ml-n5">
        <v-col v-for="(selection, i) in tags" :key="i" class="shrink">
          <v-chip close @click:close="tags.splice(i, 1)">
            {{ selection }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="mt-5" @click="submit"> Submit </v-btn>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  name: 'NewPost',

  data() {
    return {
      title: '',
      paragraphs: '',
      tag: '',
      tags: [],
      jwt: '',
    };
  },

  async mounted() {
    this.jwt = this.$auth.$storage.getCookie('loggedIn');
    await this.checkJwt(this.jwt);
  },

  methods: {
    addTag() {
      this.tags.push(this.tag);
      this.tag = '';
    },

    async checkJwt(jwt) {
      await this.$axios
        .get('/checkjwt', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .catch(function (error) {
          if (error.response && error.response.status == 401) {
            alert('Session expired.');
            window.location.replace('/logout');
          } else console.log(error);
        });
    },

    async postData(title, paragraphs, submited, tags, jwt) {
      let res = await this.$axios
        .post(
          '/entry',
          {
            title: title,
            paragraphs: paragraphs,
            submited: submited,
            tags: tags,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .catch(function (error) {
          if (error.response && error.response.status == 401) {
            alert('Session expired.');
            window.location.replace('/logout');
          } else console.log(error);
        });
      return res.data;
    },

    async submit() {
      let submited = this.$moment().format('HH:mm, DD-MM-YYYY');
      this.postData(this.title, this.paragraphs, submited, this.tags, this.jwt);
      this.$router.push('/');
    },
  },
};
</script>
