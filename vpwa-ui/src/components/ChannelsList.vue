<template>
<div class="flex column no-wrap justify-between full-height">
  <account-menu />

  <q-scroll-area class="full-width full-height">
    <q-list bordered separator>
      <q-item
        v-for="c in channels"
        :key="c.id"
        @click="() => selectChannel(c.id)"
        class="justify-between items-center"
        :class="{'bg-grey-4': activeChannel?.id === c.id, 'bg-amber-3': c.id === 'new-channel'}"
        clickable
        v-ripple
      >
        <div>
          <span class="text-subtitle2">{{c.channel_name}}</span>
          <q-icon v-if="c.is_private" name="lock" class="q-ml-sm" />
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
    ...mapGetters({
      channels: 'channels', activeChannel: 'activeChannel', user: 'user', userStatus: 'userStatus', busy: 'busy'
    })
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
    selectChannel(id: string) {
      console.log('set channel');
      this.$store.commit('setActiveChannel', id);
      console.log(this.activeChannel);
    }
  }
});
</script>
