<template>
<q-scroll-area class="full-width full-height">
  <q-list bordered separator>
    <q-item v-for="m in members" :key="m.id">
      <q-item-section>
        {{m.name}}
      </q-item-section>
      <q-btn round size="sm" icon="clear" @click="onKickMember">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          Vote for kick
        </q-tooltip>
      </q-btn>
    </q-item>
  </q-list>
</q-scroll-area>
</template>

<script>
export default {
  data() {
    return {
      members: [
        {
          id: 1,
          name: 'Name 1'
        },
        {
          id: 2,
          name: 'Name 2'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 3,
          name: 'Name 3'
        },
        {
          id: 4,
          name: 'Name example'
        }
      ]
    };
  },
  methods: {
    onKickMember() {
      console.log('not implemented');
    }
  }

};
</script>
