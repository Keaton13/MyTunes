import { SAVE_SELECTED_YOUTUBE_SEARCH } from './types'
import Youtube from '../../components/youtube';

export const handleYouTubeSearch = (trackName, artist) => dispach => {
    console.log(trackName);
    console.log(artist);
        const response = Youtube.get('/search', {
            params: {
                q: trackName + "" + artist,
                maxResults: 1
            }
        })
        if(response.items){
            dispach({
                type: SAVE_SELECTED_YOUTUBE_SEARCH,
                payload: response.data.items
            })
        } else {
            dispach({
                type: SAVE_SELECTED_YOUTUBE_SEARCH,
                payload: response
            })
        }

}