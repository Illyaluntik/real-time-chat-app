<template>
<div class="channels">
    <div class="q-pa-md" style="max-width: 400px">
        <q-list dense bordered padding class="rounded-borders">
          <q-item v-for="channel in channels" :key="channel.id" clickable v-ripple>
          <q-icon v-if=channel.private name="lock"></q-icon>
          <q-item-label>
              {{ channel.name }}
          </q-item-label>
          <q-item-section>
            <q-btn round flat icon="more_vert">
              <q-menu auto-close>
                <q-item clickabble>
                  <q-item-section>
                    Leave
                  </q-item-section>
                </q-item>
                <q-item clickabble>
                  <q-item-section>
                    Delete
                  </q-item-section>
                </q-item>
              </q-menu>
            </q-btn>
          </q-item-section>
          </q-item>
        </q-list>
    </div>
    <div class="newChannel">
      <q-btn round color="primary" icon="group_add" @click="prompt = true"></q-btn>
    </div>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">New channel name:</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="channelName" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-section>
          <div>
          <q-toggle
              v-model="channelType"
              color="secondary"
              label="Private"
              keep-color
          />
        </div>

        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add channel" v-close-popup @click="addChannel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    return { prompt: ref(false), channelName: ref(''), channelType: ref(false) };
  },
  data() {
    return {
      channels: [
        {
          id: 1,
          name: 'Channel 1',
          private: false,
        },
        {
          id: 2,
          name: 'Channel 2',
          private: false,
        },
        {
          id: 3,
          name: 'Channel 3',
          private: true,
        },
      ],
    };
  },
  methods: {
    // addChannel() {
    //   this.channels.push({
    //     name: this.channelName,
    //     private: this.channelType,
    //   });
    // },
  },
};
</script>
