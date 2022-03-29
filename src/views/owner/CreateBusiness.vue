<template>
  <section class="create-business-wrapper">
    <v-form ref="form"
            v-model="valid"
            lazy-validation>
      <v-text-field label="Company name"
                    v-model="name"
                    :rules="textRules"/>
      <v-text-field label="Company slug"
                    :rules="slugRules"
                    @input="validateSlug"
                    v-model="slug"/>
      <v-textarea
          name="input-7-1"
          label="Description"
          v-model="description"/>
      <v-file-input
          v-model="image"
          :rules="imageRules"
          prepend-icon="mdi-camera"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an image"
          counter
          show-size
          small-chips
          label="Image"/>
      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="submit">
        Create
      </v-btn>
    </v-form>
  </section>
</template>

<script>
export default {
  name: "CreateBusiness",
  data() {
    return {
      valid: true,
      name: '',
      description: '',
      slug: '',
      image: null,
      textRules: [
        v => !!v || 'Field is required'
      ],
      slugRules: [
        v => !!v || 'Field is required'
      ],
      imageRules: [
        value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
        v => !!v || 'Field is required'
      ],
    }
  },
  methods: {
    submit() {
      const isValid = this.$refs.form.validate()
      if (isValid) {
        const obj = {
          name: this.name,
          slug: this.slug,
          image: this.image,
          description: this.description,
          uid: this.$store.state.ownerAuth.user.uid,
        }
        this.$store.dispatch('createBusiness', obj)
            .then(_ => {
              this.$router.push('business')
            })
      }
    },
    validateSlug() {
      this.slug = this.slug.replaceAll('-', '_').replace(' ', '').trim()
    }
  }
}
</script>
