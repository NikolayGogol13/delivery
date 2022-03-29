import axios from 'axios'
import {db} from "@/main";

const DB_NAME = process.env.VUE_APP__FIREBASE_DATABASE__NAME
const baseUrl = process.env.VUE_APP_BASE_URL + ''
const apiKey = process.env.VUE_APP_GOOGLE_API_KEY + ''
const CORS = process.env.VUE_APP_CORS + '/'
export default {
    state: {
        api: axios
    },
    actions: {
        getImage({commit, state}, payload) {
            return state.api.get('/get-business-image', {
                params: payload
            })
        },
        updateImage({commit, state}, payload) {
            const formData = new FormData()
            formData.append('user', payload.user)
            formData.append('business', payload.business)
            formData.append('image', payload.image)
            return state.api.post('/update-business-image', formData, {
                'Content-Type': 'multipart/form-data'
            })
        },
        updateBusiness({state, commit}, payload) {
            return db.collection(DB_NAME)
                .doc(payload.user)
                .collection('business')
                .doc(payload.business)
                .set(payload)
        },
        deleteBusiness({state, commit}, payload) {
            return db.collection(DB_NAME)
                .doc(payload.user)
                .collection('business')
                .doc(payload.business)
                .delete()
                .then(_ => {
                    return state.api.delete('/delete-business', {
                        params: payload
                    })
                })

        },
        removeBusinessImage({commit, state}, payload) {
            return state.api.delete('/remove-image', {
                params: payload
            })
        },
        initMap({commit, state}, url) {
            const params = {
                key: apiKey,
                language: 'ua'
            }
            return state.api.get(`${CORS}${baseUrl}${url}`, {params})
                .then(res => {
                    console.log(res);
                })
        }
    }
}
