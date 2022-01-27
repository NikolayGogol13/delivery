<template>
  <div>
    <v-sheet
        class="mx-auto"
        max-width="500">
      <v-slide-group
          multiple
          show-arrows>
        <v-slide-item
            v-for="(image, i) in images"
            :key="i"
            v-slot="{ active, toggle }">
          <img @click="setActiveImage(image)" :src="image" alt="">
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <v-form ref="form"
            v-model="valid"
            lazy-validation>
      <v-text-field label="Company name"
                    v-model="name"
                    :rules="textRules"/>
      <img width="150" v-if="currentImage" :src="currentImage" alt="">
      <v-file-input
          v-model="image"
          prepend-icon="mdi-camera"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an image"
          counter
          show-size
          @change="uploadImage"
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
  </div>
</template>

<script>
import {db} from "@/main";

export default {
  name: "BusinessCRUD",
  data() {
    return {
      currentImage: '',
      images: [],
      valid: true,
      name: '',
      image: null,
      textRules: [
        v => !!v || 'Field is required'
      ]
    }
  },
  firestore() {
    return {
      business: db.collection(process.env.VUE_APP__FIREBASE_DATABASE__NAME)
          .doc(this.$store.state.ownerAuth.user.uid)
          .collection('business')
          .doc(this.$route.params.id)
    }
  },
  mounted() {
    this.getImage()
    setTimeout(() => {
      this.name = this.business.name
      this.currentImage = this.business.image
    }, 3000)
  },
  methods: {
    setActiveImage(image) {
      this.currentImage = image
      this.image = null
    },
    getImage() {
      const obj = {
        user: this.$store.state.ownerAuth.user.uid,
        business: this.$route.params.id
      }
      this.$store.dispatch('getImage', obj)
          .then(res => {
            res.data.forEach(el => {
              this.images.push(`/save-images/${obj.user}/${obj.business}/${el}`)
            })
          })
    },
    uploadImage() {
      const obj = {
        user: this.$store.state.ownerAuth.user.uid,
        business: this.$route.params.id,
        image: this.image
      }
      this.$store.dispatch('updateImage', obj)
          .then(r => {
            this.currentImage = r.data.replace('./public', '')
            this.getImage()
          })
    },
    submit() {
      const isValid = this.$refs.form.validate()
      if (isValid && this.currentImage) {
        const obj = {
          user: this.$store.state.ownerAuth.user.uid,
          business: this.$route.params.id,
          image: this.currentImage,
          name: this.name
        }
        this.$store.dispatch('updateBusiness', obj)
      }
    },
  },
}
</script>

