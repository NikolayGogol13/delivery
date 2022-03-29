import axios from 'axios'
import {db} from "@/main";

const DB_NAME = process.env.VUE_APP__FIREBASE_DATABASE__NAME
export default {
    state: {
        api: axios
    },
    actions: {
        createBusiness({commit, state}, payload) {
            const obj = {
                name: payload.name,
                slug: payload.slug,
                description: payload.description
            }
            // check if doc exist
            const docRef = db.collection(DB_NAME)
            return docRef.doc(payload.uid).get()
                .then(res => {
                    if (!res.exists) {
                        // create if not exist
                        return docRef.doc(payload.uid)
                            .collection('business')
                            .add(obj)
                            .then(res => {
                                const formData = new FormData()
                                formData.append('businessID', res.id)
                                formData.append('uid', payload.uid)
                                formData.append('slug', payload.slug)
                                formData.append('image', payload.image)
                                return state.api.post('/save-image', formData, {
                                    'Content-Type': 'multipart/form-data'
                                })
                            })
                    }
                })


        }
    }
}
