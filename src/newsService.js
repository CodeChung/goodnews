export const getNews = (category) => {
    const url = `https://goodnews-server.onrender.com/api/news?category=${category}`
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