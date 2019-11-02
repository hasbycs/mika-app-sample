export default function ({ $axios, redirect }) {
    $axios.onRequest(({url,method,params,data}) => {
        console.log('Making Request :',method.toUpperCase(),url,params||'',data||'');
    })

    $axios.onResponse(response => {
        console.log(`Response from ${response.request.responseURL} => status : ${response.status}`)
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })

    $axios.onRequestError(err => {
        console.log('Axios request error : ' + err)
    })

    $axios.onResponseError(err => {
        console.log('Axios response error : ' + err)
    })
}
