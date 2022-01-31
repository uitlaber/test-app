/**
 * middleware проверки авторизации
 *
 * @param next
 * @param store
 * @returns {*}
 */


export default function guest({
    next
}) {
    if (localStorage.getItem('token')) {
        return next('/')
    }
    return next()
}