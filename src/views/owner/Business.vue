<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="list"
        item-key="._key"
        hide-default-footer
        disable-pagination
        @click:row="selectRow"
        :search="search">
    </v-data-table>
  </div>
</template>

<script>
import {db} from "@/main"

export default {
  name: "Business",
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
      ]
    }
  },
  firestore() {
    return {
      list: db.collection(process.env.VUE_APP__FIREBASE_DATABASE__NAME)
          .doc(this.$store.state.ownerAuth.user.uid)
          .collection('business')
    }
  },
  methods: {
    selectRow(item) {
      this.$router.push('crud-business/' + item['.key'])
    }
  }
}
</script>
