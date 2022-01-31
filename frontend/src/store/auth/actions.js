/**
 * Инициализация авторизации
 *
 * @param context
 */
export function init({
    dispatch
}) {
    if (localStorage.getItem('token')) {    
        return dispatch('getUser')
    }
    return false

}

/**
 * Получение пользователя
 *
 * @param context
 */
export function getUser({
    commit, dispatch
}) {
    return new Promise((resolve, reject) => {
        window.axios.get(process.env.VUE_APP_API_URL + '/user').then(resp => {
            commit('SET_USER', resp.data.data)
            commit('SET_TOKEN', localStorage.getItem('token'))
            commit('SET_LOADED', true)
            dispatch('links/getLinks', null, { root: true })
            resolve(resp)
        }).catch(err => {
            localStorage.removeItem('token')
            reject(err)
        })
    })
}


/**
 * Авторизация пользователя
 *
 * @param context
 */
export function login({
    commit, dispatch
}, data) {
    return new Promise((resolve, reject) => {
        window.axios({
                url: process.env.VUE_APP_API_URL + '/login',
                data: data,
                method: 'POST'
            })
            .then(response => {
                if (response.data.type && response.data.type === 'error') {
                    resolve({
                        success: false,
                        response: response.data
                    })
                }
                localStorage.setItem('token', response.data.data.token)
                commit('SET_USER', response.data.data)
                commit('SET_TOKEN', response.data.data.token)
                dispatch('links/getLinks', null, { root: true })
                resolve({
                    success: true,
                    response: response.data
                })
            })
            .catch(err => {
                localStorage.removeItem('token')
                reject(err)
            })
    })
}

/**
 * Регистрация пользователя
 *
 * @param context
 */
export function register({
    commit, dispatch
}, data) {
    return new Promise((resolve, reject) => {
        window.axios({
                url: process.env.VUE_APP_API_URL + '/register',
                data: data,
                method: 'POST'
            })
            .then(response => {
                if (response.data.type && response.data.type === 'error') {
                    resolve({
                        success: false,
                        response: response.data
                    })
                }
                commit('SET_USER', response.data.data);
                localStorage.setItem('token', response.data.data.token)
                dispatch('links/getLinks', null, { root: true })
                resolve({
                    success: true,
                    response: response.data
                })
            })
            .catch(err => {
                localStorage.removeItem('token')
                reject(err)
            })
    })
}

/**
 * Выход из аккаунта
 *
 * @param context
 */

export function logout({
    commit
}) {
    window.axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")  
    return new Promise((resolve, reject) => {
        window.axios({
                url: process.env.VUE_APP_API_URL + '/logout',
                method: 'POST'
            })
            .then(response => {
                if (response.data.type && response.data.type === 'error') {
                 
                    resolve({
                        success: false,
                        response: response.data
                    })
                }
                localStorage.removeItem('token')
                commit('SET_USER', null)
                commit('SET_TOKEN', null)
                commit('links/SET_LINKS', null, { root: true })
                resolve({
                    success: true,
                    response: response.data
                })
            })
            .catch(err => {
                localStorage.removeItem('token')
                reject(err)
            })
    })
}
