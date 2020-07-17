export const refresh: () => Promise<boolean | void> = () => {
    try {
        return fetch(`api/refresh`, {
            method: 'POST',
            credentials: 'same-origin'
        })
        .then(data => {
            return data.status === 200
        })
        .catch((err) => {
             console.log(err)
            return false
        })
    } catch(e) {
        console.log(e)
        return Promise.resolve(false)
    }
}