<template>
  <main class="admin-login">
    <v-snackbar
        v-if="error"
        :timeout="timeout"
        :value="true"
        absolute
        centered
        right
        tile
        color="red accent-2">
      {{ error }}
    </v-snackbar>
    <LoginCreateForm @update-fields="updateFields"/>
  </main>
</template>

<script>
import LoginCreateForm from "@/components/LoginCreateForm"
import GetEnvConst from "@/helper/get-env-const";

export default {
  name: "Admin",
  components: {
    LoginCreateForm
  },
  data() {
    return {
      error: '',
      timeout: null
    }
  },
  methods: {
    updateFields(obj) {
      this.$store.dispatch('adminLogin', obj)
          .then(r => {
            if (r?.code) {
              this.error = r.message
              this.timeout = +GetEnvConst.timeOut()
            } else {
              console.log(r);
            }
          })
    }
  }
}
</script>
