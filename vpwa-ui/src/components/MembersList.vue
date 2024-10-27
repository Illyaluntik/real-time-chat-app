<template>
<q-scroll-area class="full-width full-height">
  <q-list bordered separator>
    <q-item v-for="m in members" :key="m.id">
      <div class="flex items-center">
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
          This user has currently status
          <b :class="`text-${[userStatusEnum[m.status].color]}`">{{userStatusEnum[m.status].name}}</b>
        </q-tooltip>
        <q-badge :color="userStatusEnum[user?.id === m.id ? userStatus : m.status].color" rounded class="q-mr-sm" />
        {{user?.id === m.id ? 'You' : m.name}} &nbsp; <b>{{activeChannel?.adminId === m.id ? '(Admin)' : ''}}</b>
      </div>
      <q-space />
      <q-btn
        v-if="isKickable(m.id)"
        round
        size="sm"
        icon="clear"
        @click="onKickMember"
      >
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          {{user?.id === activeChannel?.adminId ? 'Kick user' : 'Vote for kick'}}
        </q-tooltip>
      </q-btn>
    </q-item>
  </q-list>
</q-scroll-area>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import userStatusEnum from 'src/constants/userStatus.enum';

export default defineComponent({
  data() {
    return {
      members: [
        {
          id: 'a0e0f130-8c21-11df-92d9-95795a3bcd40',
          name: 'username',
          status: 'online'
        },
        {
          id: 'afaff130-8g21-1dbf-92d9-937sss3bcd40',
          name: 'username',
          status: 'offline'
        },
        {
          id: 3,
          name: 'username',
          status: 'online'
        },
        {
          id: 3,
          name: 'username',
          status: 'online'
        },
        {
          id: 3,
          name: 'username',
          status: 'online'
        },
        {
          id: 3,
          name: 'username',
          status: 'online'
        },
        {
          id: 3,
          name: 'username',
          status: 'offline'
        },
        {
          id: 3,
          name: 'username',
          status: 'online'
        },
        {
          id: 3,
          name: 'username',
          status: 'online'
        },
        {
          id: 3,
          name: 'username',
          status: 'offline'
        },
        {
          id: 3,
          name: 'username',
          status: 'dnd'
        },
        {
          id: 3,
          name: 'username',
          status: 'online'
        },
        {
          id: 3,
          name: 'username',
          status: 'offline'
        },
        {
          id: 3,
          name: 'username',
          status: 'online'
        },
        {
          id: 3,
          name: 'username',
          status: 'online'
        },
        {
          id: 3,
          name: 'username',
          status: 'offline'
        },
        {
          id: 3,
          name: 'username',
          status: 'offline'
        },
        {
          id: 3,
          name: 'username',
          status: 'online'
        },
        {
          id: 4,
          name: 'username',
          status: 'dnd'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({ activeChannel: 'activeChannel', user: 'user', userStatus: 'userStatus' }),
    userStatusEnum() {
      return userStatusEnum;
    }
  },
  methods: {
    onKickMember() {
      console.log('not implemented');
    },
    isKickable(id: string) {
      if (this.user.id === id || this.activeChannel.adminId === id)
        return false;

      if (this.activeChannel.isPrivate && this.activeChannel.adminId !== this.user.id)
        return false;

      return true;
    }
  }
});
</script>
