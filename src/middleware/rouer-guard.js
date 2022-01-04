import router from "@/router";
import store from "@/store";

const guard = router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.admin)) {
        if (!store.state.adminAuth.isAuthAdmin) {
            next({
                path: '/',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.owner)) {
        if (!store.state.ownerAuth.isAuthOwner) {
            next({
                path: '/',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default guard