<template>
  <v-data-table
      :headers="headers"
      :items="exceptAdmin"
      item-key="name"
      class="owners-wrapper"
      :hide-default-footer="true"
      :search="search">
    <template v-slot:top>
      <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"/>
    </template>
    <template v-slot:item.creationTime="{item}">
      {{ formatDate(item.metadata.creationTime) }}
    </template>
    <template v-slot:item.lastSignInTime="{item}">
      {{ formatDate(item.metadata.lastSignInTime) }}
    </template>
    <template v-slot:item.delete="{item}">
      <span class="cursor-pointer" @click="removeOwner(item)">Delete</span>
    </template>
  </v-data-table>
</template>

<script>
import {AdminOwnersHeaderTable} from "@/models/admin/admin-owners-header-table";

const maxResult = 100
const moment = require('moment')
export default {
  name: "Owners",
  components: {},
  data() {
    return {
      owners: [],
      headers: AdminOwnersHeaderTable,
      search: '',
    }
  },
  created() {
    this.getOwners(maxResult)
  },
  computed:{
    exceptAdmin() {
      return this.owners.filter(el => el.uid !== process.env.VUE_APP__ADMIN)
    }
  },
  methods: {
    getOwners(maxResults) {
      this.owners = []
      this.$store.dispatch('getOwners', maxResults)
          .then(res => {
            res.data.forEach(el => {
              this.owners.push(el)
            })
          })
    },
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY HH:mm')
    },
    removeOwner(item) {
      this.$store.dispatch('removeOwner', item)
          .then(() => {
            this.getOwners(maxResult)
          })
    }
  }
}
</script>
