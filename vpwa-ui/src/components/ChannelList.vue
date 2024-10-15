<template>
<q-space></q-space>
<div class="channels">
    <div class="q-mx-lg" style="max-width: 400px">
        <q-list dense padding>
          <q-item v-for="channel in channels" :key="channel.id" clickable v-ripple>
          <q-icon v-if=channel.isPrivate name="lock"></q-icon>
          <q-item-section>
              {{ channel.name }}
          </q-item-section>
          <q-item-section style="max-width: 10px">
            <q-btn round flat icon="more_vert">
              <q-menu auto-close>
                <q-list dense style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>Leave</q-item-section>
                 </q-item>
                 <q-item v-if=channel.isAdmin clickable v-close-popup>
                    <q-item-section>Delete</q-item-section>
                 </q-item>
                </q-list>
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
  data() {
    return {
      prompt: ref(false),
      channelName: ref(''),
      channelType: ref(false),
      channels: [
        {
          id: 1,
          name: 'Channel 1',
          isPrivate: false,
          isAdmin: false,
          readInvite: false
        },
        {
          id: 2,
          name: 'Channel 2',
          isPrivate: false,
          isAdmin: true,
          readInvite: false
        },
        {
          id: 3,
          name: 'Channel 3',
          isPrivate: true,
          isAdmin: false,
          readInvite: false
        }
      ]
    };
  },
  methods: {
    addChannel() {
      // this.channels.unshift({
      //   id: 4,
      //   name: this.channelName,
      //   isPrivate: this.channelType,
      //   isAdmin: true,
      //   readInvite: false
      // });
    }
  }
};
</script>
