
const intialstate = {
    user: []
}

export const user = (state = intialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case 'GET':
            return {
                ...state,
                user: payload
            }
        default:
            return { ...state }
    }
}