import axios from 'axios'

export default {
    state: {
        api: axios
    },
    actions: {
        getOwners({commit, state}, maxResults){
            return state.api.get('/owners-list/' + maxResults)
        },
        removeOwner({commit, state}, payload){
            return state.api.delete('/delete-owner/' + payload.uid)
        }
    }
}
