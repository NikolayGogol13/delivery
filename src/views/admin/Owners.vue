<template>
  <div class="owner-wrapper">

  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "Owners",
  components: {
  },
  data() {
    return {

    }
  },
  created() {
   axios.get('/owners-list')
  },
  methods: {
  }
}
</script>
