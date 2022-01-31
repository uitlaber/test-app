export function createShortLink({
    commit
}, data) {
    window.axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")  
    return new Promise((resolve, reject) => {
        window.axios({
                url: process.env.VUE_APP_API_URL + '/links/create',
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
                commit('SET_LINKS', response.data.data.links);
                commit('SET_CURRENT_LINK', response.data.data.result);
                resolve({
                    success: true,
                    response: response.data
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function deleteLink({
    commit
}, id) {
    window.axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")  
    return new Promise((resolve, reject) => {
        window.axios({
                url: process.env.VUE_APP_API_URL + '/links/delete/' + id,
                method: 'DELETE'
            })
            .then(response => {
                if (response.data.type && response.data.type === 'error') {
                    resolve({
                        success: false,
                        response: response.data
                    })
                } 
                commit('DELETE_LINK', id);
                resolve({
                    success: true,
                    response: response.data
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function getLinks({
    commit
}) {
    window.axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")  
    return new Promise((resolve, reject) => {     
        window.axios({
                url: process.env.VUE_APP_API_URL + '/links',
                method: 'GET'
            })
            .then(response => {
                if (response.data.type && response.data.type === 'error') {
                    resolve({
                        success: false,
                        response: response.data
                    })
                } 
                commit('SET_LINKS', response.data.data);
                resolve({
                    success: true,
                    response: response.data
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}