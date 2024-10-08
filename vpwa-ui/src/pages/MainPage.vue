<template>
  <q-page>
    <channel-list></channel-list>
    <div class="q-gutter-md" style="max-width: 300px">
    <q-form @submit="processCommand">
      <q-input rounded outlined v-model="cmd" label="Rounded outlined" />
    </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChannelList from 'src/components/ChannelList.vue';

export default defineComponent({
  components: { ChannelList },
  data() {
    return {
      cmd: '',
    };
  },
  methods: {
    processCommand() {
      console.log(this.cmd);
    },
  },

});
</script>
