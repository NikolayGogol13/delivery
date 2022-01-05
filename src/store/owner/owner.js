import axios from 'axios'

export default {
    state: {
        api: axios
    },
    actions: {
        createBusiness({commit, state}, payload) {
            const formData = new FormData()
            formData.append('image', payload.image);
            formData.append('uid', payload.uid);
            state.api.post('/save-image', formData, {
                'Content-Type': 'multipart/form-data'
            }).then(r => {
                console.log(r);
            })
        }
    }
}
