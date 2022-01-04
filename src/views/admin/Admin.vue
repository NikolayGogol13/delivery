<template>
  <main class="admin-wrapper d-flex">
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
import {linksAdmin} from "@/models/admin-sidebar";
export default {
  name: "Admin",
  components: {
    Sidebar
  },
  data(){
    return{
      links: linksAdmin
    }
  }
}
</script>
