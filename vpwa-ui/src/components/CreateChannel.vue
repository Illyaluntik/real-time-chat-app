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
        v-model="newChannel.name"
        autofocus
        @keyup.enter="onAddChannel"
        @blur="v$.newChannel.name.$touch"
        :error="v$.newChannel.name.$dirty && v$.newChannel.name.$invalid"
        :error-message="v$.newChannel.name.$errors[0]?.$message"
      />
    </q-card-section>

    <q-card-section>
      <q-checkbox v-model="newChannel.isPrivate" label="Private" />
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
  data() {
    return {
      createChannelOpen: false,
      newChannel: {
        isPrivate: false,
        name: ''
      }
    };
  },
  validations() {
    return {
      newChannel: {
        name: {
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

      this.$q.notify({
        type: 'positive',
        message: 'Successfully created channel'
      });

      return this.toggleCreateChannel();
    },
    toggleCreateChannel() {
      this.createChannelOpen = !this.createChannelOpen;
      this.newChannel.isPrivate = false;
      this.newChannel.name = '';
      this.v$.$reset();
    }
  }
});
</script>
