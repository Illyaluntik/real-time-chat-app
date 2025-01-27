<template>
  <q-chat-message
    :name="username || 'Deleted user'"
    :text="[text]"
    :stamp="timestamp"
    :sent="sent"
  >
    <template v-slot:avatar>
      <q-avatar
        size="40px"
        class="q-mx-sm"
        :style="{backgroundColor: userColor}"
        :text-color="brightness < 128 ? 'grey-2' : 'grey-9'"
      >
        {{username?.charAt(0).toUpperCase() || '?'}}
      </q-avatar>
    </template>
  </q-chat-message>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dateFormatter from 'src/misc/dateFormatter';
import generateUserColor from 'src/misc/generateUserColor';
import { colors } from 'quasar';

export default defineComponent({
  props: {
    username: { type: String },
    userId: { type: String, required: true },
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
    brightness() {
      return colors.brightness(this.userColor);
    },
    timestamp() {
      return dateFormatter(this.stamp, this.now);
    },
    userColor() {
      return generateUserColor(this.userId);
    }
  }
});
</script>
