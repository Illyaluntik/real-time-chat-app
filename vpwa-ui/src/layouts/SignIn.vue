<template>
  <div class="container q-pa-xl bg-blue-grey-2 flex column q-mx-auto text-center">
    <h1 class="text-h4 text-bold">Login to Account</h1>
    <q-input
      outlined
      v-model="username"
      label="Username"
      bg-color="white"
      class="q-mb-md"
      @blur="v$.username.$touch"
      :error="v$.username.$dirty && v$.username.$invalid"
      :error-message="v$.username.$errors[0]?.$message"
    />
    <q-input
      outlined
      v-model="password"
      label="Password"
      type="password"
      bg-color="white"
      class="q-mb-xl"
      @blur="v$.password.$touch"
      :error="v$.password.$dirty && v$.password.$invalid"
      :error-message="v$.password.$errors[0]?.$message"
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
import {
  required as VRequired, alphaNum as VAlphaNum, minLength as VMinLength, maxLength as VMaxLength
} from '@vuelidate/validators';

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
  validations() {
    return {
      username: {
        VRequired,
        VAlphaNum,
        minLengthValue: VMinLength(3),
        maxLengthValue: VMaxLength(15)
      },
      password: {
        VRequired
      }
    };
  },
  methods: {
    async onSignIn() {
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
          this.$q.notify({
            type: 'negative',
            message: err.message
          });
        });
    }
  }
});
</script>
