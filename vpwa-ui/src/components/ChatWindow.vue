<template>
<q-infinite-scroll
  v-if="!loadingChannel"
  @load="onLoad"
  :disable="!allowLoad || channel?.total === messages?.length || channel?.total < 10"
  reverse
  :initial-index="1"
  :offset="250"
  ref="infiniteScroll"
  class="q-pa-md">
  <template v-if="channel?.total > messages?.length" v-slot:loading>
    <div class="row justify-center q-my-md">
      <q-spinner color="primary" name="dots" size="40px"></q-spinner>
    </div>
  </template>

  <h5 v-if="channel?.total === 0" class="text-center">Send First Message!</h5>

  <template v-for="m in messages" :key="m.id">
    <div v-if="Date.now() - m.timestamp > 86400000" class="flex no-wrap justify-between items-center text-center">
      <div style="height: 1px;" class="bg-grey-4 col-grow" />
      <span class="q-mx-md">{{new Date(m.timestamp).toLocaleString()}}</span>
      <div style="height: 1px;" class="bg-grey-4 col-grow" />
    </div>
      <Message
        :username="members[m.author]"
        :userId="m.author"
        :text="m.body"
        :stamp="m.sent_at || m.sentAt"
        :sent="m.author === user.id"
      />
  </template>
</q-infinite-scroll>
<q-page-scroller v-if="!loadingChannel" reverse position="bottom" :scroll-offset="200" :offset="[0, 80]">
  <q-btn round color="grey-7" icon="keyboard_arrow_down" />
</q-page-scroller>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Message from 'src/components/Message.vue';
import { mapGetters } from 'vuex';
import scrollToBottom from 'src/misc/scrollToBottom';
import generateUserColor from 'src/misc/generateUserColor';
import { QInfiniteScroll } from 'quasar';

export default defineComponent({
  components: {
    Message
  },
  data() {
    return {
      loading: false,
      allowLoad: false
    };
  },
  computed: {
    ...mapGetters({
      user: 'account/user', messages: 'channels/chat', activeChannel: 'channels/activeChannel', members: 'channels/membersEnum', channel: 'channels/channel', loadingChannel: 'channels/loading'
    })
  },
  watch: {
    activeChannel() {
      this.allowLoad = false;
      this.setTimeoutForLoad();
      scrollToBottom();
      (this.$refs.infiniteScroll as QInfiniteScroll).reset();
    }
  },
  methods: {
    generateUserColor(username: string) {
      return generateUserColor(username);
    },
    setTimeoutForLoad() {
      setTimeout(() => {
        this.allowLoad = true;
      }, 1000);
    },
    onLoad(page: number, done: () => void) {
      this.loading = true;

      this.$store.dispatch('channels/loadMessages', page)
        .then((data) => {
          if (data?.length === 0)
            this.allowLoad = false;

          setTimeout(() => {
            this.loading = false;
          });
          done();
        })
        .catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: err.message
          });
        });
    }
  },
  updated() {
    if (!this.loading)
      scrollToBottom();
  }
});
</script>
