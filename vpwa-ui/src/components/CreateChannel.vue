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
      <q-input dense v-model="newChannel.name" autofocus @keyup.enter="createChannelOpen = false" />
    </q-card-section>

    <q-card-section>
      <q-checkbox v-model="newChannel.isPrivate" label="Private" />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Add channel" v-close-popup @click="onAddChannel" />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      createChannelOpen: false,
      newChannel: {
        isPrivate: false,
        name: ''
      }
    };
  },
  methods: {
    onAddChannel() {
      console.log('not implemented');
    },
    toggleCreateChannel() {
      this.newChannel.isPrivate = false;
      this.newChannel.name = '';
      this.createChannelOpen = !this.createChannelOpen;
    }
  }
});
</script>
