<template>
  <q-chat-message
    :name="sentBy"
    :text="[text]"
    :stamp="timestamp"
    :sent="sent"
  >
    <template v-slot:avatar>
      <q-avatar
        size="40px"
        class="q-mx-sm"
        :style="{backgroundColor: userColor}"
      >
        {{sentBy.charAt(0).toUpperCase()}}
      </q-avatar>
    </template>
  </q-chat-message>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dateFormatter from 'src/misc/dateFormatter';
import generateUserColor from 'src/misc/generateUserColor';

export default defineComponent({
  props: {
    sentBy: { type: String, required: true },
    text: { type: String, required: true },
    stamp: { type: String, required: true },
    sent: { type: Boolean, required: true }
  },
  data() {
    return {
      now: Date.now()
    };
  },
  created() {
    this.scheduleUpdateNow();
  },
  methods: {
    updateNow() {
      this.now = Date.now();
      this.scheduleUpdateNow();
    },
    scheduleUpdateNow() {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      setTimeout(this.updateNow, 1000);
    }
  },
  computed: {
    timestamp() {
      return dateFormatter(this.stamp, this.now);
    },
    userColor() {
      return generateUserColor(this.sentBy);
    }
  }
});
</script>
