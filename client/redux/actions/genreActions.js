import { GENRE_SELECT_READY, GENRE_SELECT_UNREADY, SEND_USER_GENRE_SELECTION } from './types';

export const genreReady = () => dispach => {
    dispach({
        type: GENRE_SELECT_READY
    });
}

export const genreUnready = () => dispach => {
    dispach({
        type: GENRE_SELECT_UNREADY
    })
}

export const sendUserGenres = () => dispach => {
    //create Spotify discover fetch here//
    
    dispach({
        type: SEND_USER_GENRE_SELECTION
    })
}