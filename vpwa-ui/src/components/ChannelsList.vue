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
          <span class="text-subtitle2">{{c.name}}</span>
          <q-icon v-if="c.isPrivate" name="lock" class="q-ml-sm" />
        </div>
        <q-badge rounded color="primary" label="2" />
      </q-item>
    </q-list>
  </q-scroll-area>

  <q-btn
    color="grey-7"
    text-color="white"
    label="Create Channel"
    class="full-width"
    @click="toggleCreateChannel"
  />
</div>

<q-dialog v-model="createChannelOpen" persistent>
  <q-card style="min-width: 350px">
    <q-card-section>
      <span class="text-h6">New channel name:</span>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input dense v-model="newChannel.name" autofocus @keyup.enter="createChannelOpen = false" />
    </q-card-section>

    <q-card-section>
      <q-checkbox v-model="newChannel.isPrivate" label="Private" />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Add channel" v-close-popup @click="onAddChannel" />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { useRoute } from 'vue-router';

import AccountMenu from 'src/components/AccountMenu.vue';

export default defineComponent({
  components: { AccountMenu },
  setup() {
    return {
      route: useRoute()
    };
  },
  data() {
    return {
      createChannelOpen: false,
      newChannel: {
        isPrivate: false,
        name: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      channels: 'channels', activeChannel: 'activeChannel', user: 'user', userStatus: 'userStatus', busy: 'busy'
    })
  },
  watch: {
    activeChannel({ id }) {
      void this.$router.push({ name: 'channels', params: { id } });
    },
    channels() {
      if (this.route.params.id)
        this.selectChannel(this.route.params.id as string);
    }
  },
  methods: {
    onAddChannel() {
      console.log('not implemented');
    },
    selectChannel(id: string) {
      this.$store.commit('setActiveChannel', id);
    },
    toggleCreateChannel() {
      this.newChannel.isPrivate = false;
      this.newChannel.name = '';
      this.createChannelOpen = !this.createChannelOpen;
    }
  }
});
</script>
