import { GENRE_SELECT_READY, GENRE_SELECT_UNREADY, SEND_USER_GENRE_SELECTION } from '../actions/types';

const initalState = {
    genreSelect: {
        status: false
    },
    discover: {
        data: []
    }
}

export default function (state = initalState, action) {
    switch (action.type) {
        case GENRE_SELECT_READY:
            return {
                genreSelect: {
                    status: true
                }
            };
        case GENRE_SELECT_UNREADY:
            return {
                genreSelect: {
                    status: false
                }
            };
        case SEND_USER_GENRE_SELECTION:
            return {
                ...state,
                discover: {
                    data: action.payload
                }
            }
        default:
            return state;
    }
}