<template>
<q-btn-dropdown
  bg-color="white"
  class="absolute-top justify-between"
>
  <template v-slot:label>
    <div class="flex items-center">
      <q-avatar size="60px">
        <img src="https://cdn.quasar.dev/img/avatar1.jpg">
      </q-avatar>
      <span>{{user?.username}}</span>
    </div>
  </template>

  <div class="q-pa-sm">
    <q-btn
      label="Logout"
      color="grey-7"
      size="md"
      v-close-popup
      @click="onLogout"
    />
  </div>

  <!-- <div class="row no-wrap q-pa-md">
    <div class="column">
      <div class="text-h6 q-mb-md">Settings</div>
      <q-toggle v-model="mobileData" label="Use Mobile Data" />
      <q-toggle v-model="bluetooth" label="Bluetooth" />
    </div>

    <q-separator vertical inset class="q-mx-lg" />

    <div class="column items-center">
      <q-avatar size="72px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
      </q-avatar>

      <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

      <q-btn
        color="primary"
        label="Logout"
        push
        size="sm"
        v-close-popup
      />
    </div>
  </div> -->
</q-btn-dropdown>
<q-scroll-area style="height: calc(100% - 36px - 68px); margin-top: 68px;">
  <q-list bordered separator>
    <q-item
      v-for="c in channels"
      :key="c.id"
      @click="() => selectChannel(c.id)"
      class="justify-between items-center"
      :class="{'bg-grey-4': activeChannel?.id === c.id}"
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
  class="absolute-bottom"
  @click="toggleCreateChannel"
/>

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

export default defineComponent({
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
    ...mapGetters({ channels: 'channels', activeChannel: 'activeChannel', user: 'user' })
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
    onLogout() {
      void this.$router.push({ name: 'login' });
    },
    onAddChannel() {
      console.log('not implemented');
    },
    selectChannel(id: string) {
      this.$store.commit('setActiveChannel', id);
    },
    toggleCreateChannel() {
      // console.log(this.channels);
      this.newChannel.isPrivate = false;
      this.newChannel.name = '';
      this.createChannelOpen = !this.createChannelOpen;
    }
  }
});
</script>
