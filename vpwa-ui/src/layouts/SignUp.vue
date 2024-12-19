<template>
  <div class="container q-pa-xl bg-blue-grey-2 flex column q-mx-auto text-center">
    <h1 class="text-h4 text-bold">Register</h1>
    <q-input
      outlined
      v-model="fullName"
      label="Full Name"
      bg-color="white"
      class="q-mb-md"
      @blur="v$.fullName.$touch"
      :error="v$.fullName.$dirty && v$.fullName.$invalid"
      :error-message="v$.fullName.$errors[0]?.$message"
    />
    <q-input
      outlined
      v-model="email"
      label="Email"
      bg-color="white"
      class="q-mb-md"
      @blur="v$.email.$touch"
      :error="v$.email.$dirty && v$.email.$invalid"
      :error-message="v$.email.$errors[0]?.$message"
    />
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
      :type="showPassword ? 'password' : 'text'"
      bg-color="white"
      class="q-mb-xl"
      @blur="v$.password.$touch"
      :error="v$.password.$dirty && v$.password.$invalid"
      :error-message="v$.password.$errors[0]?.$message"
    >
      <template v-slot:append>
        <q-icon
          :name="showPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="showPassword = !showPassword"
        />
      </template>
    </q-input>
    <q-btn
      color="white"
      text-color="black"
      label="Create an Account"
      class="q-mb-lg q-py-sm"
      @click.stop="onSignUp"
      :loading="busy"
    />
    <span>Already have an account?</span>
    <q-btn
      color="grey-7"
      text-color="white"
      label="Login"
      class="q-mt-lg q-py-sm"
      to="/login"
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
  helpers, required as VRequired, email as VEmail, alphaNum as VAlphaNum, minLength as VMinLength, maxLength as VMaxLength
} from '@vuelidate/validators';

export default defineComponent({
  setup() {
    return {
      v$: useVuelidate()
    };
  },
  data() {
    return {
      showPassword: false
    };
  },
  computed: {
    fullName: {
      get() {
        return this.$store.state.account.registerData.fullName;
      },
      set(v) {
        this.$store.commit('account/updateRegisterData', { field: 'fullName', value: v });
      }
    },
    email: {
      get() {
        return this.$store.state.account.registerData.email;
      },
      set(v) {
        this.$store.commit('account/updateRegisterData', { field: 'email', value: v });
      }
    },
    username: {
      get() {
        return this.$store.state.account.registerData.username;
      },
      set(v) {
        this.$store.commit('account/updateRegisterData', { field: 'username', value: v });
      }
    },
    password: {
      get() {
        return this.$store.state.account.registerData.password;
      },
      set(v) {
        this.$store.commit('account/updateRegisterData', { field: 'password', value: v });
      }
    },
    ...mapGetters({ busy: 'account/busy' })
  },
  validations() {
    return {
      fullName: {
        VRequired,
        noDigits: helpers.withMessage('Must not contain digits', (v: string) => /^([^0-9]*)$/g.test(v)),
        atLeastTwoWords: helpers.withMessage('Full name must contain at least 2 words', (v: string) => /^[a-zA-Z]{2,40}(?: +[a-zA-Z]{2,40})+$/g.test(v))
      },
      email: { VRequired, VEmail },
      username: {
        VRequired,
        VAlphaNum,
        minLengthValue: VMinLength(3),
        maxLengthValue: VMaxLength(15)
      },
      password: {
        VRequired,
        atLeastOneChar: helpers.withMessage('Password must contain at least 1 character', (v: string) => /[a-zA-Z]/.test(v)),
        atLeastOneDigit: helpers.withMessage('Password must contain at least 1 digit', (v: string) => /\d/.test(v)),
        minLengthValue: VMinLength(6),
        maxLengthValue: VMaxLength(16)
      }
    };
  },
  methods: {
    async onSignUp() {
      const result = await this.v$.$validate();

      if (!result)
        return this.v$.$errors.map((e) => this.$q.notify({
          type: 'warning',
          message: e.$message as string
        }));

      return this.$store.dispatch('account/register')
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully created account'
          });
          // this.$store.dispatch('getAccount')
          //   .then(() => this.$router.push({ name: 'home' }).then(() => this.$store.commit('resetRegisterForm')))
          //   .catch((err) => console.log(err));
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
