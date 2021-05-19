import { SAVE_SELECTED_YOUTUBE_SEARCH } from './types';
import Youtube from '../../components/youtube';

export const handleYouTubeSearch = (trackName, artist) => dispach => {
  console.log(trackName);
  console.log(artist);
  const response = Youtube.get('/search', {
    params: {
      q: trackName + '' + artist,
      maxResults: 1
    }
  }).then(res => {
    console.log(res);
    if (res.data.items[0]) {
      dispach({
        type: SAVE_SELECTED_YOUTUBE_SEARCH,
        payload: res.data.items
      });
    } else {
      dispach({
        type: SAVE_SELECTED_YOUTUBE_SEARCH,
        payload: response
      });
    }
  });
};
