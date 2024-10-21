<template>
<q-list bordered>
    <q-item v-for="m in members" :key="m.id">
    <q-item-section>
        {{ m.name }}
    </q-item-section>
     <q-btn round icon="clear" @click="kickMember"></q-btn>
    </q-item>
</q-list>
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
          id: 4,
          name: 'Name 4'
        }
      ]
    };
  },
  methods: {
    kickMember() {
      console.log('not implemented');
    }
  }

};
</script>
