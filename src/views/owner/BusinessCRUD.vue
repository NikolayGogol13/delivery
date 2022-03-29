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
      <h2>General</h2>
      <section class="d-block mb-5 mt-5">
        <v-divider/>
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
        <v-textarea
            name="input-7-1"
            label="Description"
            v-model="description"/>
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
      </section>
      <h2>Working</h2>
      <v-divider/>
      <section class="my-5 working">
        <div class="d-flex flex-wrap">
          <div class="col-33 px-3" v-for="(item, i) in weekDays" :key="i">
            <v-checkbox
                v-model="selected"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            Start date
            <date-picker :disabled="!selected.includes(item.value)"
                         v-model="timeFrom[i]"
                         type="time"/>
            End date
            <date-picker :disabled="!selected.includes(item.value)"
                         v-model="timeTo[i]"
                         type="time"/>
          </div>

        </div>
      </section>
      <h2>Coordination</h2>
      <v-divider/>
      <section class="my-5">
        <input v-model="googleSearch"
               @input="googleSearchAction"
               type="text"
               placeholder="Enter a location" />
        <GmapMap
            v-if="coords.lat && coords.lon"
            ref="map"
            :center="{lat:coords.lat, lng:coords.lon}"
            :zoom="18"
            :options="{
           zoomControl: false,
           mapTypeControl: false,
           scaleControl: false,
           streetViewControl: false,
           rotateControl: false,
           fullscreenControl: false,
           disableDefaultUi: false
         }"
            map-type-id="terrain"
            style="width: 100%; height: 300px">
        </GmapMap>
      </section>
      <section class="d-flex mt-5">
        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit">
          Update
        </v-btn>
        <v-btn
            color="error"
            class="mr-4"
            @click="deleteBusiness">
          Delete business
        </v-btn>
      </section>
    </v-form>
  </div>
</template>

<script>
import {db} from "@/main";
import GetEnvConst from "@/helper/get-env-const";
import {weekDay} from "@/models/owner/week-day";
import VueTimepicker from 'vue-time-picker'

export default {
  name: "BusinessCRUD",
  components: {
    VueTimepicker
  },
  data() {
    return {
      success: false,
      text: '',
      timeFrom: [],
      timeTo: [],
      description: '',
      timeout: null,
      activeImageIndex: -1,
      currentImage: '',
      googleSearch: '',
      images: [],
      selected: [],
      valid: true,
      name: '',
      mainData: {},
      image: null,
      textRules: [
        v => !!v || 'Field is required'
      ],
      weekDays: weekDay,
      coords: {
        lat: '',
        lon: ''
      }
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
      this.description = this.business.description
    }, 3000)
    this.initMap()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
            this.coords.lat = pos.coords.latitude
            this.coords.lon = pos.coords.longitude
          }, function (e) {
            console.log(e);
          }
      );

    }
  },
  methods: {
    googleSearchAction() {
      const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: ["establishment"],
      };
      console.log(this.$refs.map);
      // const autocomplete = this.$refs.map.places.Autocomplete(this.googleSearch, options);
    },
    initMap() {
      // this.$store.dispatch('initMap', {
      //   url: '/place/details/json?',
      // })
    },
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
      if (isValid && this.currentImage && (this.timeFrom.length === this.timeTo.length)) {
        const obj = {
          user: this.$store.state.ownerAuth.user.uid,
          business: this.$route.params.id,
          image: this.currentImage,
          description: this.description,
          name: this.name,
          working: JSON.stringify(this.weekDays)
        }
        this.$store.dispatch('updateBusiness', obj).then(_ => {
          this.text = "Update Success"
          this.timeout = +GetEnvConst.timeOut()
          this.success = true
        })
      } else {
        alert('select image or working day')
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
  watch: {
    'selected': function (e) {
      if (e) {
        e.forEach(el => {
          const a = this.weekDays.find(item => item.value === el)
          const index = this.weekDays.findIndex(item => item.value === el)
          a.selected = true
          a.timerange = {
            start: this.timeFrom[index],
            end: this.timeTo[index]
          }
        })
        const b = this.weekDays.filter(el => !e.includes(el.value))
        b.forEach(item => {
          item.selected = false
          item.timerange = {}
        })
      }
    }
  }
}
</script>

