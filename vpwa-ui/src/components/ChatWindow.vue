<template>
<div class="q-pa-md">
<q-infinite-scroll @load="onLoad" reverse>
  <template v-if="chat?.total > chat?.messages.length" v-slot:loading>
    <div class="row justify-center q-my-md">
      <q-spinner color="primary" name="dots" size="40px"></q-spinner>
    </div>
  </template>

  <h5 v-if="chat?.total === 0" class="text-center">Send First Message!</h5>

  <q-chat-message
    v-for="m in messages"
    :key="m.id"
    :name="m.name"
    avatar="https://cdn.quasar.dev/img/avatar1.jpg"
    :text="[m.text]"
    :stamp="dateFormatter(m.timestamp)"
    :sent="m.sent"
  />
</q-infinite-scroll>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import dateFormatter from 'src/misc/dateFormatter';
import { MessageInterfase } from 'src/store/channels/state';

export default defineComponent({
  data() {
    return {
      loading: false,
      messages: <Array<MessageInterfase>> []
    };
  },
  computed: {
    ...mapGetters({ activeChannel: 'activeChannel', chat: 'chat' }),
    dateFormatter() {
      return dateFormatter;
    }
  },
  watch: {
    chat() {
      this.messages = this.chat.messages;
    }
  },
  methods: {
    onLoad() {
      console.log('not implemented');
      // setTimeout(() => {
      //   if (!this.messages || this.messages.length === 0)
      //     this.messages = this.chat?.messages;

      //   // this.messages.splice(0, 0, ...this.chat?.messages);
      //   this.messages = [...this.messages, ...this.chat?.messages];
      // }, 2000);
    }
  },
  mounted() {
    // this.body = document.body;
    // window.scrollTo(0, document.body.scrollHeight);
  }
});
</script>
