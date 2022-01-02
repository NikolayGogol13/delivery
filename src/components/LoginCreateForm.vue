<template>
  <main class="login-create-wrapper">
    <v-form ref="form"
            v-model="valid"
            lazy-validation>
      <v-text-field label="Email"
                    v-model="email"
                    :rules="emailRules"/>
      <v-text-field label="Password"
                    v-model="password"
                    @keydown.enter="submit"
                    :rules="passwordRules"/>
      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="submit">
        Log in
      </v-btn>
    </v-form>
  </main>
</template>

<script>
export default {
  name: "LoginCreateForm",
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      passwordRules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    submit() {
      const isValid = this.$refs.form.validate()
      if (isValid) {
        const obj = {
          email: this.email,
          password: this.password
        }
        this.$emit('update-fields', obj)
      }
    }
  }
}
</script>
