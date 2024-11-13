<template>
<q-infinite-scroll @load="onLoad" reverse class="q-pa-md">
  <template v-if="chat?.total > chat?.messages.length" v-slot:loading>
    <div class="row justify-center q-my-md">
      <q-spinner color="primary" name="dots" size="40px"></q-spinner>
    </div>
  </template>

  <h5 v-if="chat?.total === 0" class="text-center">Send First Message!</h5>

  <template v-for="m in messages" :key="m.id">
    <div v-if="Date.now() - m.timestamp > 86400000" class="flex no-wrap justify-between items-center text-center">
      <div style="height: 1px;" class="bg-grey-4 col-grow" />
      <span class="q-mx-md">{{new Date(m.timestamp).toLocaleString()}}</span>
      <div style="height: 1px;" class="bg-grey-4 col-grow" />
    </div>
    <q-chat-message
      :name="m.name"
      avatar="https://cdn.quasar.dev/img/avatar1.jpg"
      :text="[m.text]"
      :stamp="dateFormatter(m.timestamp)"
      :sent="m.sent"
    />
  </template>
</q-infinite-scroll>
<q-page-scroller reverse position="bottom" :scroll-offset="200" :offset="[0, 80]">
  <q-btn round color="grey-7" icon="keyboard_arrow_down" />
</q-page-scroller>
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
      // this.messages = this.chat.messages;
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
    // new Date().getUTCDate
    // this.body = document.body;
    // window.scrollTo(0, document.body.scrollHeight);
  }
});
</script>
