<template>
  <div class="container q-pa-xl bg-blue-grey-2 flex column q-mx-auto text-center">
    <h1 class="text-h4 text-bold">Login to Account</h1>
    <q-input
      outlined
      v-model="login"
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
  margin-top: 10vh;
  border-radius: 10px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    onSignIn() {
      console.log('not implemented');
    },
  },
});
</script>
