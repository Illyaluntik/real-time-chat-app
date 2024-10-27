<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-grey-9">
      <q-toolbar class="flex justify-between">
        <q-btn
          v-if="user"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleChannelsList"
        />
        <div v-if="activeChannel">
          {{activeChannel.name}}
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
      v-if="user"
      v-model="channelsListOpen"
      show-if-above
      side="left"
      bordered
    >
      <channels-list />
    </q-drawer>
    <q-drawer
      v-if="user && activeChannel"
      v-model="channelInfoOpen"
      show-if-above
      side="right"
      bordered
    >
      <channel-info />
    </q-drawer>

    <q-page-container class="relative-position q-pt-auto">
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
import { mapGetters } from 'vuex';
import ChannelsList from 'src/components/ChannelsList.vue';
import ChannelInfo from 'src/components/ChannelInfo.vue';

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
    ...mapGetters({ activeChannel: 'activeChannel', user: 'user' })
  },
  methods: {
    onSend() {
      this.mainInput = '';
    },
    toggleChannelsList() {
      this.channelsListOpen = !this.channelsListOpen;
    },
    toggleChannelInfo() {
      this.channelInfoOpen = !this.channelInfoOpen;
    }
  },
  beforeMount() {
    if (!this.user)
      this.$store.dispatch('getAccount')
        .then(() => this.$store.dispatch('getChannels'))
        .catch(() => this.$router.push({ name: 'login' }));
    else
      void this.$store.dispatch('getChannels');
  }
});
</script>
