import {
    createStore
} from 'vuex'
import auth from './auth'
import links from './links'

const store = createStore({
    modules: {
        auth,
        links
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    // strict: process.env.DEBUGGING
})

export default store;