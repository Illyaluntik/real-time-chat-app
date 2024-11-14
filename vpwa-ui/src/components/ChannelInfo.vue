<template>
<div class="flex column no-wrap justify-between full-height">
  <div class="flex justify-center items-center shadow-2 q-py-md">
    <span class="text-h6">{{activeChannel?.name}}</span>
    <q-icon v-if="activeChannel?.isPrivate" name="lock" class="q-ml-sm" />
  </div>

  <members-list />

  <div>
    <q-btn
      v-if="(activeChannel?.isPrivate && activeChannel?.adminId === user?.id) || !activeChannel?.isPrivate"
      color="grey-7"
      text-color="white"
      label="Add member"
      class="full-width q-mb-md"
      @click="onAddMember"
    />
    <q-btn
      color="grey-7"
      text-color="white"
      label="Leave Channel"
      class="full-width"
      @click="onLeaveChannel"
    />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import MembersList from './MembersList.vue';

export default defineComponent({
  components: { MembersList },
  computed: {
    ...mapGetters({ activeChannel: 'channels/activeChannel', user: 'account/user' })
  },
  methods: {
    onAddMember() {
      console.log('not implemented');
    },
    onLeaveChannel() {
      return this.$store.dispatch('leaveChannel', this.user.id)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully leaved channel'
          });
          void this.$store.dispatch('getChannels');
        })
        .catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: err.message
          });
        });
    }
  }
});
</script>
