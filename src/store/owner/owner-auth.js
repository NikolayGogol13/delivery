import firebase from "firebase"
export default {
    state: {
        user: null,
        isAuthOwner: false,
    },
    mutations: {
        ownerLogin(state, data) {
            state.user = data
            state.isAuthOwner = true
        },
        logOut(state) {
            state.user = null
            state.isAuthOwner = false
        }
    },
    actions: {
        ownerLogin({commit, state}, payload) {
            return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    commit('ownerLogin', userCredential.user)
                    return userCredential.user
                })
                .catch((error) => {
                    return error
                })
        },
        adminLogOut({commit, state}) {
            return firebase.auth().signOut()
                .then(res => {
                    commit('logOut')
                    return res
                })
                .catch(err => {
                    return err
                })
        },
    }

}
