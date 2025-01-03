<template>
<div class="flex column no-wrap justify-between full-height">
  <div class="flex justify-center items-center shadow-2 q-py-md">
    <span class="text-h6">{{channel?.channelName}}</span>
    <q-icon v-if="channel?.isPrivate" name="lock" class="q-ml-sm" />
  </div>

  <members-list :members="members"/>

  <div>
    <add-member-component v-if="channel !== null && ((channel.isPrivate && user.id === channel.admin) || !(channel.isPrivate))"/>
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
import { Account } from 'src/store/account/state';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import MembersList from './MembersList.vue';
import AddMemberComponent from './AddMemberComponent.vue';

export default defineComponent({
  components: { MembersList, AddMemberComponent },
  computed: {
    ...mapGetters({ activeChannel: 'channels/activeChannel', user: 'account/user', channel: 'channels/channel' }),
    members(): Account[] {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.$store.getters['channels/members'];
    }
  },
  methods: {
    onAddMember() {
      return this.$store.dispatch('channels/addMember');
    },
    onLeaveChannel() {
      console.log(this.channel);
      return this.$store.dispatch('account/leaveChannel', this.activeChannel)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully leaved from channel'
          });
          void this.$store.dispatch('channels/leave');
          void this.$router.push({ name: 'channels' });
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
