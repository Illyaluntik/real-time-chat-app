<template>
<q-btn
  color="grey-7"
  text-color="white"
  label="Create Channel"
  class="full-width"
  @click="toggleCreateChannel"
/>
<q-dialog v-model="createChannelOpen" persistent>
  <q-card style="min-width: 350px">
    <q-card-section>
      <span class="text-h6">New channel name:</span>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input
        dense
        v-model="newChannel.channel_name"
        autofocus
        @keyup.enter="onAddChannel"
        @blur="v$.newChannel.channel_name.$touch"
        :error="v$.newChannel.channel_name.$dirty && v$.newChannel.channel_name.$invalid"
        :error-message="v$.newChannel.channel_name.$errors[0]?.$message"
      />
    </q-card-section>

    <q-card-section>
      <q-checkbox v-model="newChannel.is_private" label="Private" />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" @click="toggleCreateChannel" />
      <q-btn flat label="Add channel" @click="onAddChannel" />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

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
    ...mapGetters({
      user: 'user'
    })
  },
  data() {
    return {
      createChannelOpen: false,
      newChannel: {
        is_private: false,
        channel_name: ''
      }
    };
  },
  validations() {
    return {
      newChannel: {
        channel_name: {
          VRequired,
          VAlphaNum,
          minLengthValue: VMinLength(3),
          maxLengthValue: VMaxLength(15)
        }
      }
    };
  },
  methods: {
    async onAddChannel() {
      const result = await this.v$.$validate();

      if (!result)
        return this.v$.$errors.map((e) => this.$q.notify({
          type: 'warning',
          message: e.$message as string
        }));

      // this.$q.notify({
      //   type: 'positive',
      //   message: 'Successfully created channel'
      // });

      // return this.toggleCreateChannel();

      console.log(this.user);

      return this.$store.dispatch('createChannel', { ...this.newChannel, admin: this.user?.id })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully created channel'
          });
          void this.$store.dispatch('getChannels');
          this.toggleCreateChannel();
          // this.$store.dispatch('getAccount')
          //   .then(() => this.$router.push({ name: 'home' }).then(() => this.$store.commit('resetLoginForm')))
          //   .catch((err) => console.log(err));
        })
        .catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: err.message
          });
        });
    },
    toggleCreateChannel() {
      this.createChannelOpen = !this.createChannelOpen;
      this.newChannel.is_private = false;
      this.newChannel.channel_name = '';
      this.v$.$reset();
    }
  }
});
</script>
