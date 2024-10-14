<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-grey-9">
      <q-toolbar class="flex justify-between">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <div v-if="activeChannel !== null" class="chat-info">
          <span>{{activeChannel}}</span>
          <!-- <span><q-icon name="people" />&nbsp; {{activeChannel.users}}</span> -->
        </div>
        <q-btn
          flat
          dense
          round
          icon="info"
          aria-label="Menu"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <div
          v-for="c in channels"
          :key="c.id"
          @click="() => selectChannel(c.id)"
          class="q-pa-md flex justify-between items-center cursor-pointer"
          :class="{'bg-grey-3': activeChannel === c.id}"
        >
          <span class="text-subtitle1 text-weight-medium">{{c.name}}</span>
          <q-icon v-if="c.isPrivate" name="lock" />
        </div>
      </q-list>
    </q-drawer>
    <q-page-container class="relative-position">
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
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    return {
      route: useRoute()
    };
  },
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    ...mapGetters({ channels: 'channels', activeChannel: 'activeChannel' })
  },
  watch: {
    activeChannel(id) {
      // console.log(v);
      // this.$router.push()
      void this.$router.push({ name: 'channels', params: { id } });
    }
  },
  methods: {
    selectChannel(id: string) {
      this.$store.commit('setActiveChannel', id);
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }
  },
  beforeMount() {
    void this.$store.dispatch('getChannels');

    if (this.route.params.id)
      this.selectChannel(this.route.params.id as string);
  }
});
</script>
