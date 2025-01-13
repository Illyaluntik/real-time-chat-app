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
        <div v-if="channel">
          {{channel.channelName}}
        </div>
        <q-btn
          v-show="channel"
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
import scrollToBottom from 'src/misc/scrollToBottom';
import { channelService } from 'src/services';

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
    ...mapGetters({
      user: 'account/user', channels: 'account/channels', activeChannel: 'channels/activeChannel', channel: 'channels/channel'
    })
  },
  methods: {
    async onSend() {
      const message = this.mainInput;
      this.mainInput = '';
      if (message.startsWith('/')) {
        const cmd = message.split(' ');
        if (message.startsWith('/join')) {
          let isPrivate = false;
          if (cmd.length > 3) {
            console.log('vela znakov');
          }

          if (cmd.length === 3 && cmd[2] === 'private') {
            isPrivate = true;
          }
          await this.$store.dispatch('account/joinChannel', { channelName: cmd[1], isPrivate });
          channelService.leave(cmd[1]);
        }
        if (message.startsWith('/invite')) {
          if (this.activeChannel === null && this.channel === null) {
            console.log('not selected channel');
          } else if (this.channel.isPrivate && this.user.id === this.channel.admin) {
            await this.$store.dispatch('channels/addMember', { channel: this.activeChannel, username: cmd[1] });
          } else {
            console.log('unathorized');
          }
        }
        if (message.startsWith('/revoke')) {
          if (this.activeChannel !== null && this.channel !== null) {
            if (this.channel.admin === this.user.id) {
              await this.$store.dispatch('channels/revoke', { channel: this.activeChannel, kickUser: cmd[1] });
            } else {
              console.log('unauthorized');
            }
          }
        }
        if (message.startsWith('/kick')) {
          if (this.activeChannel !== null) {
            await this.$store.dispatch('channels/handleRemoval', { channel: this.activeChannel, kickUser: cmd[1] });
          }
        }
        if (message.startsWith('/quit')) {
          if (this.activeChannel !== null) {
            await this.$store.dispatch('account/leaveChannel', this.activeChannel);
          }
        }
        if (message.startsWith('/cancel')) {
          if (this.activeChannel !== null) {
            await this.$store.dispatch('account/leaveChannel', this.activeChannel);
          }
        }
        if (message.startsWith('/list')) {
          if (this.activeChannel !== null) {
            this.channelInfoOpen = true;
          }
        } else {
          console.log('unknown command');
        }
      } else if (this.activeChannel && message.length > 0 && !message.startsWith('\n')) {
        await this.addMessage({ channel: this.activeChannel, message });
        scrollToBottom();
      } else {
        console.error('Error while sending message');
      }
    },
    toggleChannelsList() {
      this.channelsListOpen = !this.channelsListOpen;
      // this.$store.commit('channels/allowLoadMessages', !this.channelsListOpen);
    },
    toggleChannelInfo() {
      this.channelInfoOpen = !this.channelInfoOpen;
      // this.$store.commit('channels/allowLoadMessages', !this.channelInfoOpen);
    },
    // ...mapActions('channels', ['addMessage'])
    ...mapActions({ addMessage: 'channels/addMessage' })
  },
  beforeMount() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    // this.$store.dispatch('account/getUserChannels', this.user.id);
    // if (!this.user)
    //   this.$store.dispatch('getAccount')
    //     .then(() => this.$store.dispatch('getChannels'))
    //     .catch(() => this.$router.push({ name: 'login' }));
    // else
    //   void this.$store.dispatch('getChannels');
  }
});
</script>
