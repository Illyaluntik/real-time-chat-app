<template>
<div class="flex column no-wrap justify-between full-height">
  <account-menu />

  <q-scroll-area class="full-width full-height">
    <q-list bordered separator>
      <q-item
        v-for="c in channels"
        :key="c.id"
        @click="() => selectChannel(c.channelName)"
        class="justify-between items-center"
        :class="{'bg-grey-4': activeChannel === c.channelName}"
        clickable
        v-ripple
      >
        <div>
          <span class="text-subtitle2">{{c.channelName}}</span>
          <q-icon v-if="c.isPrivate" name="lock" class="q-ml-sm" />
        </div>
        <!-- <q-badge rounded color="primary" label="2" /> -->
      </q-item>
    </q-list>
  </q-scroll-area>

  <create-channel />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { useRoute } from 'vue-router';
import AccountMenu from 'src/components/AccountMenu.vue';
import CreateChannel from 'src/components/CreateChannel.vue';

export default defineComponent({
  components: { AccountMenu, CreateChannel },
  setup() {
    return {
      route: useRoute()
    };
  },
  computed: {
    ...mapGetters({ channels: 'account/channels', activeChannel: 'channels/activeChannel' })
  },
  watch: {
    activeChannel(id) {
      void this.$router.push({ name: 'channels', params: { id } });
    },
    channels() {
      if (this.route.params.id)
        this.selectChannel(this.route.params.id as string);
    }
  },
  methods: {
    selectChannel(channel: string) {
      void this.$store.dispatch('channels/join', channel);
      this.$store.commit('channels/setActiveChannel', channel);
    }
  }
});
</script>
