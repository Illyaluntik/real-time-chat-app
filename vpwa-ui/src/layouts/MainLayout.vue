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
        <div v-if="activeChannel" class="chat-info">
          <span>{{activeChannel.name}}</span>
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
      bordered
    >
      <channel-list />
    </q-drawer>
    <q-drawer
      v-model="channelInfoOpen"
      side="right"
      bordered
    >
      <channel-info />
    </q-drawer>

    <q-page-container class="relative-position q-pt-auto">
      <router-view />
      <!-- <q-input
        outlined
        v-model="password"
        label="Password"
        type="password"
        bg-color="white"
        class="fixed-bottom full-width"
      /> -->
    </q-page-container>
  </q-layout>
</template>

<style lang="less" scoped>
.chat-info {
  display: flex;
  justify-items: center;
  gap: 20px;
}
.q-page-container {
  padding-bottom: 80px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import ChannelList from 'src/components/ChannelList.vue';
import ChannelInfo from 'src/components/ChannelInfo.vue';

export default defineComponent({
  components: { ChannelList, ChannelInfo },
  data() {
    return {
      channelsListOpen: false,
      channelInfoOpen: false
    };
  },
  computed: {
    ...mapGetters({ activeChannel: 'activeChannel', user: 'user' })
  },
  methods: {
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
  }
});
</script>
