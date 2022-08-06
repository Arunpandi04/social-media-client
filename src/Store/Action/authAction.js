import axios from '../../Utlis/custom-axios'

const Base_URL = 'http://localhost:5000';

export const login = (formData) => {
    return async (dispatch) => {
        return await axios.post(`${Base_URL}/user/login`,formData).then(res => {
            sessionStorage.setItem('authenticate',true);
            sessionStorage.setItem('id',res.data?.user?._id);
            sessionStorage.setItem('email',res.data?.user?.email);
            sessionStorage.setItem('accessToken',res.data?.accessToken);
            sessionStorage.setItem('refreshToken',res.data?.refreshToken);
            dispatch({
                type: 'LOGIN',
                payload: res.data.data
            })
        }).catch(err => {
            sessionStorage.clear();
            dispatch({
                type: 'FAILED',
                payload: err.response.data
            })
        });
    }
}

export const getUser = (id) => {
    return async (dispatch) => {
        return await axios.get(`${Base_URL}/user/get-user/${id}`).then(res => {
            dispatch({
                type: 'GET_USER',
                payload: res.data
            })
        }).catch(err => {
            sessionStorage.clear();
            dispatch({
                type: 'FAILED',
                payload: err.response.data
            })
        })
    };
}



export const getAllUser = (offset,limit) => {
    return async (dispatch) => {
        return await axios.get(`${Base_URL}/user/get-alluser?offset=${offset}&limit=${limit}`).then(res => {
            dispatch({
                type: 'GET_ALLUSER',
                payload: res.data
            })
        }).catch(err => {
            sessionStorage.clear();
            console.log("err",err.response)
            dispatch({
                type: 'FAILED',
                payload: err.response.data
            })
        })
    };
}


export const follow = (id,fId) => {
    console.log("id",id,fId)
    return async (dispatch) => {
        return await axios.post(`${Base_URL}/user/follow/${id}`,{id: fId}).then(res => {
            dispatch({
                type: 'FOLLOW_USER',
                payload: res.data
            })
        }).catch(err => {
            sessionStorage.clear();
            dispatch({
                type: 'FAILED',
                payload: err.response.data
            })
        })
    };
}

export const unfollow = (id,fId) => {
    return async (dispatch) => {
        return await axios.post(`${Base_URL}/user/unfollow/${id}`,{id: fId}).then(res => {
            dispatch({
                type: 'UNFOLLOW_USER',
                payload: res.data
            })
        }).catch(err => {
            sessionStorage.clear();
            dispatch({
                type: 'FAILED',
                payload: err.response.data
            })
        })
    };
}

export const search = (keyword) => {
    if(!keyword){
        console.log("keyword------>",keyword)
        keyword = "!"
    }
    return async (dispatch) => {
        return await axios.get(`${Base_URL}/user/search/${keyword}`).then(res => {
            dispatch({
                type: 'SEARCH',
                payload: res.data
            })
        }).catch(err => {
            sessionStorage.clear();
            dispatch({
                type: 'FAILED',
                payload: err.response.data
            })
        })
    };
}

export const logout = () => {
    return async (dispatch) => {
        return await axios.post(`${Base_URL}/user/logout`,{id: sessionStorage.getItem('id')}).then(res => {
            sessionStorage.clear();
            dispatch({
                type: 'LOGOUT',
                payload: res.data
            })
        }).catch(err => {
            sessionStorage.clear();
            dispatch({
                type: 'FAILED',
                payload: err.response.data
            })
        })
    };
}