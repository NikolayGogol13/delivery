import axios from 'axios'
import {db} from "@/main";

const DB_NAME = process.env.VUE_APP__FIREBASE_DATABASE__NAME

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
            const updateObj = {
                name: payload.name,
                image: payload.image
            }
            return db.collection(DB_NAME)
                .doc(payload.user)
                .collection('business')
                .doc(payload.business)
                .set(updateObj)
        }
    }
}
