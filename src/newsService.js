export const getNews = (category) => {
    const url = `${process.env.API}/api/news?category=${category}`
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log('res', res)
            return res.rows
        })
        .catch(err => {
            console.error('error: ', err)
        })
}