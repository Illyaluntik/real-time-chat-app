<template>
<q-infinite-scroll @load="onLoad" reverse class="q-pa-md">
  <!-- <template v-if="chat?.total > chat?.messages?.length" v-slot:loading>
    <div class="row justify-center q-my-md">
      <q-spinner color="primary" name="dots" size="40px"></q-spinner>
    </div>
  </template> -->

  <!-- <h5 v-if="?.total === 0" class="text-center">Send First Message!</h5> -->

  <template v-for="m in messages" :key="m.id">
    <div v-if="Date.now() - m.timestamp > 86400000" class="flex no-wrap justify-between items-center text-center">
      <div style="height: 1px;" class="bg-grey-4 col-grow" />
      <span class="q-mx-md">{{new Date(m.timestamp).toLocaleString()}}</span>
      <div style="height: 1px;" class="bg-grey-4 col-grow" />
    </div>
    <q-chat-message
      :name="members[m.author]"
      :text="[m.body]"
      :stamp="dateFormatter(m.sent_at)"
      :sent="m.author === user.id"
    >
      <template v-slot:avatar>
        <q-avatar
          size="40px"
          class="q-mx-sm"
          :style="{backgroundColor: generateUserColor(m.author)}"
      >
        {{members[m.author].charAt(0).toUpperCase()}}
      </q-avatar>
      </template>
    </q-chat-message>
  </template>
</q-infinite-scroll>
<q-page-scroller reverse position="bottom" :scroll-offset="200" :offset="[0, 80]">
  <q-btn round color="grey-7" icon="keyboard_arrow_down" />
</q-page-scroller>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dateFormatter from 'src/misc/dateFormatter';
import { mapGetters } from 'vuex';
import scrollToBottom from 'src/misc/scrollToBottom';
import generateUserColor from 'src/misc/generateUserColor';

export default defineComponent({
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      user: 'account/user', messages: 'channels/chat', activeChannel: 'channels/activeChannel', members: 'channels/membersEnum'
    }),
    dateFormatter() {
      return dateFormatter;
    }
  },
  watch: {
    messages() {
      setTimeout(() => {
        scrollToBottom();
      });
    }
  },
  methods: {
    generateUserColor(username: string) {
      return generateUserColor(username);
    },
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
  }
});
</script>
