<template>
  <div class="owner-wrapper">
    <pre>{{ owners }}</pre>
  </div>
</template>

<script>
export default {
  name: "Owners",
  components: {},
  data() {
    return {
      owners: []
    }
  },
  created() {
    this.getOwners(2)
  },
  methods: {
    getOwners(maxResults) {
      this.$store.dispatch('getOwners', maxResults)
          .then(res => {
            res.data.forEach(el => {
              this.owners.push(el)
            })
          })
    }
  }
}
</script>
