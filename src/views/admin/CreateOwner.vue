<template>
  <div class="owner-wrapper">
    <v-snackbar
        v-if="error"
        :timeout="timeout"
        :value="true"
        absolute
        centered
        right
        tile
        color="red accent-2">
      {{ text }}
    </v-snackbar>
    <v-snackbar
        v-if="success"
        :timeout="timeout"
        :value="true"
        absolute
        centered
        right
        tile
        color="success accent-2">
      {{ text }}
    </v-snackbar>
    <LoginCreateForm btn-text="create"
                     type="text"
                     ref="LoginCreateForm"
                     @update-fields="updateFields"/>
  </div>
</template>

<script>
import LoginCreateForm from "@/components/LoginCreateForm";
import GetEnvConst from "@/helper/get-env-const";

export default {
  name: "CreateOwner",
  components: {
    LoginCreateForm
  },
  data() {
    return {
      error: false,
      success: false,
      text: '',
      timeout: null
    }
  },
  methods: {
    updateFields(obj) {
      this.$store.dispatch('createOwner', obj)
          .then(r => {
            if (r?.code) {
              this.error = true
              this.success = false
              this.text = r.message
              this.timeout = +GetEnvConst.timeOut()
            } else {
              this.error = false
              this.success = true
              this.$refs.LoginCreateForm.email = ''
              this.$refs.LoginCreateForm.password = ''
              this.text = "Owner created"
              this.timeout = +GetEnvConst.timeOut()
              this.$store.dispatch('sendOwnerCreds', obj)
            }
          })
    }
  }
}
</script>
