<template>
  <main class="owner-wrapper d-flex">
    <v-row no-gutters>
      <v-col sm="3">
        <Sidebar :links="links"/>
      </v-col>
      <v-col sm="9" class="pa-5">
        <router-view/>
      </v-col>
    </v-row>
  </main>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import {linksOwner} from "@/models/owner/owner-sidebar";

export default {
  name: "Owner",
  components: {
    Sidebar
  },
  data() {
    return {
      links: linksOwner
    }
  }
}
</script>
