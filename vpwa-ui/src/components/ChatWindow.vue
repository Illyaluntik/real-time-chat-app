<template>
<q-infinite-scroll @load="onLoad" reverse class="q-pa-md">
  <template v-if="chat?.total > chat?.messages.length" v-slot:loading>
    <div class="row justify-center q-my-md">
      <q-spinner color="primary" name="dots" size="40px"></q-spinner>
    </div>
  </template>

  <h5 v-if="chat?.total === 0" class="text-center">Send First Message!</h5>

  <template v-for="m in msg" :key="m.id">
    <div v-if="Date.now() - m.timestamp > 86400000" class="flex no-wrap justify-between items-center text-center">
      <div style="height: 1px;" class="bg-grey-4 col-grow" />
      <span class="q-mx-md">{{new Date(m.timestamp).toLocaleString()}}</span>
      <div style="height: 1px;" class="bg-grey-4 col-grow" />
    </div>
    <q-chat-message
      :name="m.author"
      avatar="https://cdn.quasar.dev/img/avatar1.jpg"
      :text="[m.body]"
      :stamp="dateFormatter(m.sent_at)"
    />
  </template>
</q-infinite-scroll>
<q-page-scroller reverse position="bottom" :scroll-offset="200" :offset="[0, 80]">
  <q-btn round color="grey-7" icon="keyboard_arrow_down" />
</q-page-scroller>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dateFormatter from 'src/misc/dateFormatter';
import { Message } from 'src/store/channels/state';

export default defineComponent({
  data() {
    return {
      loading: false,
      messages: <Array<Message>> []
    };
  },
  computed: {
    // ...mapGetters({ activeChannel: 'activeChannel', chat: 'chat' }),
    msg() : Message[] {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.$store.getters['channels/chat'];
    },
    dateFormatter() {
      return dateFormatter;
    }
  },
  watch: {
    chat: {
      handler() {
        // void this.$nextTick(() => this.scrollMessages());
      }
    }
  },
  methods: {
    onLoad() {
      // this.messages = this.$store.getters['channels/chat'];
      // console.log(this.messages);
      // console.log('not implemented');
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
