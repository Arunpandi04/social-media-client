
const intialstate = {
    user: {},
    users: [],
    total: 0,
    search: [],
    isAuthenticated: false,
    error: {}
};

export const auth = (state = intialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case 'LOGIN':
        case 'GET_USER':
        case 'FOLLOW_USER':
        case 'UNFOLLOW_USER':
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
            }
        case 'GET_ALLUSER':
            return {
                ...state,
                total: payload.total,
                users: payload.user,
            }
        case 'SEARCH':
            return {
                ...state,
                search: payload,
            }
        case 'LOGOUT' : 
            return {
                user: {},
                users: [],
                total: 0,
                search: [],
                isAuthenticated: false,
                error: {}
            }
        case 'FAILED':
            return {
                ...state,
                user: {},
                isAuthenticated: false,
                error: payload
            }
        default:
            return { ...state }
    }
}