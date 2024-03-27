const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER_LIST':
            return action.payload
        default:
            return state
    }
}

export const filterList = filter => {
    return {
        type: 'FILTER_LIST',
        payload: filter
    }
}

export default filterReducer