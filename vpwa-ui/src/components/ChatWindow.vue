<template>
<!-- <q-infinite-scroll @load="onLoad" :offset="250" reverse class="q-pt-auto q-px-md">
  <template v-slot:loading>
    <div class="row justify-center q-my-md">
      <q-spinner-dots color="primary" size="40px" />
    </div>
  </template>
  <q-chat-message
    v-for="m in chat?.messages"
    :key="m.id"
    :name="m.name"
    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
    :text="[m.text]"
    :stamp="dateFormatter(m.timestamp)"
    :sent="m.sent"
  />
  <h5 v-if="chat?.total === 0" class="text-center">Send First Message!</h5>
</q-infinite-scroll> -->
<div class="q-pa-md">
  <q-infinite-scroll @load="chat?.total > chat?.messages.length && onLoad()" reverse>
    <template v-if="chat?.total > chat?.messages.length" v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner color="primary" name="dots" size="40px" />
      </div>
    </template>

    <h5 v-if="chat?.total === 0" class="text-center">Send First Message!</h5>

    <q-chat-message
      v-for="m in chat?.messages"
      :key="m.id"
      :name="m.name"
      avatar="https://cdn.quasar.dev/img/avatar1.jpg"
      :text="[m.text]"
      :stamp="dateFormatter(m.timestamp)"
      :sent="m.sent"
    />
  </q-infinite-scroll>
</div>
</template>

<style lang="less" scoped>
.q-infinite-scroll {
  // padding: 0 20px;
  // height: 100%;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import dateFormatter from 'src/misc/dateFormatter';

export default defineComponent({
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters({ activeChannel: 'activeChannel', chat: 'chat' }),
    dateFormatter() {
      return dateFormatter;
    }
  },
  methods: {
    onLoad() {
      console.log('onLoad');
    }
  }
  // mounted() {
  //   window.scrollTo(0, document.body.scrollHeight);
  // }
});
</script>
