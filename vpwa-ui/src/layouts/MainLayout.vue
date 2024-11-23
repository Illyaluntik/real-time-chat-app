<template>
  <q-layout view="hHh LpR lff">
    <q-header elevated class="bg-grey-9">
      <q-toolbar class="flex justify-between">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleChannelsList"
        />
        <div v-if="activeChannel">
          {{activeChannel}}
        </div>
        <q-btn
          v-show="activeChannel"
          flat
          dense
          round
          icon="info"
          aria-label="Info"
          @click="toggleChannelInfo"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="channelsListOpen"
      show-if-above
      side="left"
      bordered
    >
      <channels-list />
    </q-drawer>
    <q-drawer
      v-model="channelInfoOpen"
      show-if-above
      side="right"
      bordered
    >
      <channel-info />
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-input
        v-model="mainInput"
        filled
        borderless
        square
        bg-color="white"
        placeholder="Enter message or command"
        autogrow
        color="white"
        class="fixed-bottom full-width shadow-3"
        :class="{'channels-list-open': channelsListOpen, 'channel-info-open': channelInfoOpen}"
        @keydown.enter="onSend"
      >
        <template v-slot:append>
          <q-icon
            name="send"
            class="cursor-pointer"
            @click="onSend"
          />
        </template>
      </q-input>
    </q-page-container>
  </q-layout>
</template>

<style lang="less" scoped>
.q-page-container {
  padding-bottom: 80px;
}
.channels-list-open {
  padding-left: 300px;
}
.channel-info-open {
  padding-right: 300px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import ChannelsList from 'src/components/ChannelsList.vue';
import ChannelInfo from 'src/components/ChannelInfo.vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  components: { ChannelsList, ChannelInfo },
  data() {
    return {
      mainInput: '',
      channelsListOpen: false,
      channelInfoOpen: false
    };
  },
  computed: {
    ...mapGetters({ user: 'account/user', channels: 'account/channels', activeChannel: 'channels/activeChannel' })
  },
  methods: {
    async onSend() {
      await this.addMessage({ channel: 'general', message: this.mainInput });
      this.mainInput = '';
    },
    toggleChannelsList() {
      this.channelsListOpen = !this.channelsListOpen;
    },
    toggleChannelInfo() {
      this.channelInfoOpen = !this.channelInfoOpen;
    },
    // ...mapActions('channels', ['addMessage'])
    ...mapActions({ addMessage: 'channels/addMessage' })
  },
  beforeMount() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.$store.dispatch('account/getUserChannels', this.user.id);
    // if (!this.user)
    //   this.$store.dispatch('getAccount')
    //     .then(() => this.$store.dispatch('getChannels'))
    //     .catch(() => this.$router.push({ name: 'login' }));
    // else
    //   void this.$store.dispatch('getChannels');
  }
});
</script>
