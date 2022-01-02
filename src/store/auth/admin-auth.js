import firebase from "firebase"

export default {
    state: {},
    actions: {
        adminLogin({commit, state}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log(errorCode)
                    console.log(errorMessage)
                })
        },
        createAdmin({commit, state}, payload) {
            return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    return user
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    return error
                })
        }
    }
}
