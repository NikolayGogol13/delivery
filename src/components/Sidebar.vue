<template>
  <v-list>
    <v-list-item v-for="(item, i) in links"
                 class="cursor-pointer"
                 @click="goTo(item)"
                 :key="i">
      <v-list-item-icon v-if="item.icon">
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ item.label }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  methods: {
    goTo(item) {
      if (item.logOut) {
        this.$store.dispatch('adminLogOut')
            .then(() => {
              this.$router.push('/')
            })
      } else {
        this.$router.push(item.path)
      }
    }
  }
}
</script>
