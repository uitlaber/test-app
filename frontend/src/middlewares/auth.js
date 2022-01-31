/**
 * middleware проверки авторизации
 *
 * @param next
 * @param store
 * @returns {*}
 */


export default function auth ({
    next
}) {
    if (!localStorage.getItem('token')) {
          return next('/login')
    }
    return next()
}