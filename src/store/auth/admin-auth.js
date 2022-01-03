import firebase from "firebase"

export default {
    state: {},
    actions: {
        adminLogin({commit, state}, payload) {
            return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    return userCredential.user
                })
                .catch((error) => {
                    return error
                })
        },
    }
}
