<template>
  <q-btn-dropdown
    color="grey-8"
    class="full-width q-py-md"
    style="border-radius: 0px"
  >
    <template v-slot:label>
      <div class="flex items-center" style="text-transform: none">
        <q-avatar size="50px" class="relative-position q-mr-sm">
          <img src="https://cdn.quasar.dev/img/avatar1.jpg">
          <!-- <q-badge :color="userStatusEnum[userStatus].color" rounded class="absolute-bottom-right" /> -->
        </q-avatar>
        <span>{{user?.username}}</span>
      </div>
      <q-space />
    </template>

    <div>
      <q-list>
        <q-item clickable v-close-popup @click="() => setUserStatus('online')">
          <div class="flex items-center">
            <q-badge :color="userStatusEnum.online.color" rounded class="q-mr-sm" />
            Online
          </div>
        </q-item>
        <q-item clickable v-close-popup @click="() => setUserStatus('offline')">
          <div class="flex items-center">
            <q-badge :color="userStatusEnum.offline.color" rounded class="q-mr-sm" />
            Offline
          </div>
        </q-item>
        <q-item clickable v-close-popup @click="() => setUserStatus('dnd')">
          <div class="flex items-center">
            <q-badge :color="userStatusEnum.dnd.color" rounded class="q-mr-sm" />
            Do not disturb
          </div>
        </q-item>
      </q-list>
      <div class="q-pa-sm">
        <q-btn
          label="Logout"
          color="grey-7"
          size="md"
          class="full-width"
          v-close-popup
          :loading="busy"
          @click="onLogout"
        />
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import userStatusEnum from 'src/constants/userStatus.enum';

export default defineComponent({
  computed: {
    ...mapGetters({
      user: 'account/user', userStatus: 'userStatus', busy: 'account/busy'
    }),
    userStatusEnum() {
      return userStatusEnum;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('account/logout')
        .then(() => this.$router.push({ name: 'login' }))
        .catch((err) => console.error(err));
    },
    setUserStatus(status: string) {
      this.$store.commit('account/setUserStatus', status);
    }
  }
});
</script>
