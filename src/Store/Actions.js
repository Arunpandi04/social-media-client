import axios from 'axios'


export const getAlluser = () => {
    return async (dispatch) => {
        const config = {
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
            header: {}
        }
        const data = await axios(config)
        if (data.data) {
            dispatch({
                type: 'GET',
                payload: data.data
            })
        }
    }
}