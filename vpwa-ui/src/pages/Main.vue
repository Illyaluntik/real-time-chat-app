<template>
  <q-infinite-scroll @load="onLoad" :offset="250" reverse>
    <!-- <div v-for="(item, index) in items" :key="index" class="caption">
      <p>Lorem rcitationem aut, natus minima, porro labore.</p>
    </div>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template> -->
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
    <div v-for="x in 10" :key="x">
      <q-chat-message
        v-for="(message, i) in messages"
        :key="i"
        :name="message.name"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="[message.text]"
        :stamp="message.stamp"
        :sent="message.sent"
      />
    </div>
  </q-infinite-scroll>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      message: '',
      messages: [
        {
          name: 'Name 1', text: 'Message example text 1', sent: true, stamp: '10 minutes ago',
        },
        {
          name: 'Name 2', text: 'Message example text 2', sent: false, stamp: '20 minutes ago',
        },
      ],
    };
  },
});
</script>
