<template>
<q-btn
      color="grey-7"
      text-color="white"
      label="Add member"
      class="full-width q-mb-md"
      @click="toggleAddMember"
    />
    <q-dialog v-model="addMemberOpen" persistent>
  <q-card style="min-width: 350px">
    <q-card-section>
      <span class="text-h6">New member:</span>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input
        dense
        v-model="newUser"
        autofocus
        @keyup.enter="onAddMember"
      />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" @click="toggleAddMember" />
      <q-btn flat label="Add" @click="onAddMember" />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  data() {
    return {
      addMemberOpen: false,
      newUser: ''
    };
  },
  computed: {
    ...mapGetters({ activeChannel: 'channels/activeChannel' })
  },
  methods: {
    onAddMember() {
      this.addMemberOpen = !this.addMemberOpen;
      return this.$store.dispatch('channels/addMember', { channel: this.activeChannel, username: this.newUser });
    },
    toggleAddMember() {
      this.addMemberOpen = !this.addMemberOpen;
      this.newUser = '';
    }
  }
});
</script>
