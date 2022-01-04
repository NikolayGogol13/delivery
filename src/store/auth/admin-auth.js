import firebase from "firebase"
import axios from 'axios'

const url = 'http://localhost:5001/my-project-1505985398534/us-central1/sendEmailCF'
export default {
    state: {
        user: null,
        api: axios
    },
    mutations: {
        adminLogin(state, data) {
            state.user = data
        },
        logOut(state) {
            state.user = null
        }
    },
    actions: {
        adminLogin({commit, state}, payload) {
            return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    commit('adminLogin', userCredential.user)
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
        createOwner({commit, state}, payload) {
            return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    return userCredential.user
                })
                .catch((error) => {
                    return error
                })
        },
        sendOwnerCreds({commit, state}, payload) {
            console.log(payload);
            state.api.post(url, {
                email: payload.email,
                password: payload.password,
                message: 'ssss'
            }).then(r => {
                console.log(r);
            })
        }
    }

}
