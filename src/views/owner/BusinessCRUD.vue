<template>
  <div class="business-crud">
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
    <img width="300" v-if="currentImage" :src="currentImage" alt="">
    <v-form ref="form"
            v-model="valid"
            lazy-validation>
      <v-text-field label="Company name"
                    v-model="name"
                    :rules="textRules"/>
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
    <div class="images">
      <div v-for="(img, i) in images"
           class="image-wrapper"
           :key="i">
        <img :src="img"
             :class="{active: activeImageIndex === i}"
             @click="setActiveImage(img, i)"
             :alt="img">
        <div class="remove" @click="removeImage(img)">x</div>
      </div>

    </div>
    <v-btn
        color="error"
        class="mr-4"
        @click="deleteBusiness">
      Delete business
    </v-btn>
  </div>
</template>

<script>
import {db} from "@/main";
import GetEnvConst from "@/helper/get-env-const";

export default {
  name: "BusinessCRUD",
  data() {
    return {
      success: false,
      text: '',
      timeout: null,
      activeImageIndex: -1,
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
    setActiveImage(image, index) {
      this.currentImage = image
      this.image = null
      this.activeImageIndex = index
    },
    getImage() {
      const obj = {
        user: this.$store.state.ownerAuth.user.uid,
        business: this.$route.params.id
      }
      this.images = []
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
        this.$store.dispatch('updateBusiness', obj).then(_ => {
          this.text = "Update Success"
          this.timeout = +GetEnvConst.timeOut()
          this.success = true
        })
      }
    },
    deleteBusiness() {
      const obj = {
        user: this.$store.state.ownerAuth.user.uid,
        business: this.$route.params.id,
        key: this.business['.key']
      }
      this.$store.dispatch('deleteBusiness', obj)
          .then(_ => {
            this.$router.push('/owner/business')
          })
    },
    removeImage(img) {
      const obj = {
        user: this.$store.state.ownerAuth.user.uid,
        business: this.$route.params.id,
        key: img
      }
      this.$store.dispatch('removeBusinessImage', obj)
          .then(_ => {
            this.getImage()
            this.text = "Deleted Success"
            this.timeout = +GetEnvConst.timeOut()
            this.success = true
          })
    }
  },
}
</script>

