<template>
<div class="q-pa-md flex column justify-between full-height">
  <div class="flex justify-center items-center">
    <span class="text-h6">{{activeChannel?.name}}</span>
    <q-icon v-if="activeChannel?.isPrivate" name="lock" class="q-ml-sm" />
  </div>
  <div>
    <member-list></member-list>
  </div>
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

<style lang="less" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import MemberList from './MemberList.vue';

export default defineComponent({
  computed: {
    ...mapGetters({ activeChannel: 'activeChannel', user: 'user' })
  },
  methods: {
    onAddMember() {
      console.log('not implemented');
    },
    onLeaveChannel() {
      console.log('not implemented');
    }
  },
  components: { MemberList }
});
</script>
