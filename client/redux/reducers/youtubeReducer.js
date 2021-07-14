import { SAVE_SELECTED_YOUTUBE_SEARCH } from '../actions/types';

const initalState = {
  youtubeSearch: []
};

export default function (state = initalState, action) {
  switch (action.type) {
    case SAVE_SELECTED_YOUTUBE_SEARCH:
      return {
        ...state,
        youtubeSearch: action.payload
      };
    default:
      return state;
  }
}
