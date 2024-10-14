<template>
  <div class="container q-pa-xl bg-blue-grey-2 flex column q-mx-auto text-center">
    <h1 class="text-h4 text-bold">Login to Account</h1>
    <q-input
      outlined
      v-model="username"
      label="Username"
      bg-color="white"
      class="q-mb-md"
    />
    <q-input
      outlined
      v-model="password"
      label="Password"
      type="password"
      bg-color="white"
      class="q-mb-xl"
    />
    <q-btn
      color="white"
      text-color="black"
      label="Login"
      class="q-mb-lg q-py-sm"
      @click="onSignIn"
      :loading="busy"
    />
    <span>Don’t have an account?</span>
    <q-btn
      color="grey-7"
      text-color="white"
      label="Create an Account"
      class="q-mt-lg q-py-sm"
      to="/register"
    />
  </div>
</template>

<style lang="less" scoped>
.container {
  max-width: 700px;
  margin: 10vh auto 0;
  border-radius: 10px;

  @media screen and (max-width: 600px) {
    height: 100vh;
    margin: 0;
    border-radius: 0;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';

export default defineComponent({
  setup() {
    return {
      v$: useVuelidate()
    };
  },
  computed: {
    username: {
      get() {
        return this.$store.state.account.loginData.username;
      },
      set(v) {
        this.$store.commit('updateUsername', v);
      }
    },
    password: {
      get() {
        return this.$store.state.account.loginData.password;
      },
      set(v) {
        this.$store.commit('updatePassword', v);
      }
    },
    ...mapGetters(['busy'])
  },
  methods: {
    async onSignIn() {
      // this.$store.dispatch('login')
      //   .then(() => this.$router.push({ name: 'main' }))
      //   .catch((err) => console.error(err));

      const result = await this.v$.$validate();

      if (!result)
        return this.v$.$errors.map((e) => this.$q.notify({
          type: 'warning',
          message: e.$message as string
        }));

      return this.$store.dispatch('login')
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully logged in'
          });
          this.$store.dispatch('getAccount')
            .then(() => this.$router.push({ name: 'channels' }))
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.error(err);

          this.$q.notify({
            type: 'negative',
            message: err.message
          });
        });
    }
  }
});
</script>
