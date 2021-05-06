import {
  AUTHORIZE_USER_SPOTIFY,
  SAVE_SPOTIFY_TOKEN,
  GRAB_USER_MOST_PLAYED_SPOTIFY,
  GRAB_USER_RECENTLY_PLAYED_TRACKS,
  CHECK_USER_AUTH_TOKEN,
  SAVE_DUPLICATE_TRACKS,
  SAVE_DUPLICATE_ARTISTS,
  SAVE_TOP_TRACKS,
  SAVE_TOP_ARTISTS,
  SAVE_SPOTIFY_RECOMMENDATIONS,
  SAVE_SPOTIFY_CURRENTLY_PLAYING
} from './types';

export const authorizeUserSpotify = () => dispach => {
  fetch('http://localhost:3000/api/authorizeUserSpotify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      mode: 'no-cors'
    }
  })
    .then(res => {
      const data = res.json();
      return data;
    })
    .then(data => {
      const url = data.data.url;
      window.location = url;
      return window.location.href;
    })
    .then(url => {
      dispach({
        // window.location = url;
        type: AUTHORIZE_USER_SPOTIFY,
        payload: url
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const saveSpotifyUserToken = token => dispach => {
  if (window.location.href.length >= 32) {
    fetch('http://localhost:3000/api/saveSpotifyUserToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    })
      .then(res => {
        return res;
      })
      .then(data => {
        dispach({
          // window.location = url;
          type: SAVE_SPOTIFY_TOKEN,
          payload: token
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
};

export const grabUserMostPlayedSpotify = token => dispach => {
  fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      const data = res.json();
      return data;
    })
    .then(data => {
      dispach({
        // window.location = url;
        type: GRAB_USER_MOST_PLAYED_SPOTIFY,
        payload: data
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const grabUserRecentlyPlayedSpotify = token => dispach => {
  fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      const data = res.json();
      return data;
    })
    .then(data => {
      dispach({
        // window.location = url;
        type: GRAB_USER_RECENTLY_PLAYED_TRACKS,
        payload: data
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const checkUserAuthToken = token => dispach => {
  fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      const data = res.json();
      return data;
    })
    .then(data => {
      dispach({
        // window.location = url;
        type: CHECK_USER_AUTH_TOKEN,
        payload: data
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const checkForDuplicates = (
  mostPlayedTracks,
  recentTracks
) => dispach => {
  // const favorites = [];
  const tracks = [];
  const topTracks = [];
  const artits = [];
  const topArtits = [];
  if (mostPlayedTracks && recentTracks) {
    for (let i = 0; i < recentTracks.length; i++) {
      tracks.push(recentTracks[i].track.id);
      artits.push(recentTracks[i].track.artists[0].id);
    }
    for (let v = 0; v < mostPlayedTracks.length; v++) {
      tracks.push(mostPlayedTracks[v].id);
      artits.push(mostPlayedTracks[v].artists[0].id);
    }
    tracks.sort();
    artits.sort();
    for (let i = 0; i < artits.length - 1; i++) {
      let count = 0;
      const duplicates = [];
      for (let v = 0; v < artits.length - 1; v++) {
        if (artits[v] === artits[i]) {
          count++;
          if (i !== v) {
            duplicates.push(v);
          }
        }
      }
      for (let g = duplicates.length - 1; g >= 0; g--) {
        artits.splice(duplicates[g], 1);
      }
      if (count >= 2) {
        topArtits.push({
          item: artits[i],
          count: count
        });
      }
    }

    for (let i = 0; i < tracks.length - 1; i++) {
      let count = 0;
      const duplicates = [];
      for (let v = 0; v < tracks.length - 1; v++) {
        if (tracks[v] === tracks[i]) {
          count++;
          if (i !== v) {
            duplicates.push(v);
          }
        }
      }
      for (let g = duplicates.length - 1; g >= 0; g--) {
        tracks.splice(duplicates[g], 1);
      }
      if (count >= 2) {
        topTracks.push({
          item: tracks[i],
          count: count
        });
      }
    }
    dispach({
      // window.location = url;
      type: SAVE_DUPLICATE_ARTISTS,
      payload: topArtits
    });
    dispach({
      type: SAVE_DUPLICATE_TRACKS,
      payload: topTracks
    });
  }
};

export const getTopSongAndArtist = (topTracks, topArtits) => dispach => {
  const trackMax = [
    { item: '', count: 0 },
    { item: '', count: 0 },
    { item: '', count: 0 },
    { item: '', count: 0 },
    { item: '', count: 0 }
  ];
  const artistMax = [
    { item: '', count: 0 },
    { item: '', count: 0 },
    { item: '', count: 0 },
    { item: '', count: 0 },
    { item: '', count: 0 }
  ];
  for (let i = 0; i < topTracks.length; i++) {
    if (topTracks[i].count > trackMax[0].count) {
      trackMax[0] = topTracks[i];
    } else if (topTracks[i].count > trackMax[1].count) {
      trackMax[1] = topTracks[i];
    } else if (topTracks[i].count > trackMax[2].count) {
      trackMax[2] = topTracks[i];
    } else if (topTracks[i].count > trackMax[3].count) {
      trackMax[3] = topTracks[i];
    } else if (topTracks[i].count > trackMax[4].count) {
      trackMax[4] = topTracks[i];
    }
  }

  for (let i = 0; i < topArtits.length; i++) {
    if (topArtits[i].count > artistMax[0].count) {
      artistMax[0] = topArtits[i];
    } else if (topArtits[i].count > artistMax[1].count) {
      artistMax[1] = topArtits[i];
    } else if (topArtits[i].count > artistMax[2].count) {
      artistMax[2] = topArtits[i];
    } else if (topArtits[i].count > artistMax[3].count) {
      artistMax[3] = topArtits[i];
    } else if (topArtits[i].count > artistMax[4].count) {
      artistMax[4] = topArtits[i];
    }
  }

  let artistSeed = '';
  for (let i = 0; i < artistMax.length; i++) {
    if (artistMax[i].item !== '') {
      switch (i) {
        case 0:
          artistSeed = artistSeed.concat(artistMax[i].item + '%2C');
          break;
        case 1:
          artistSeed = artistSeed.concat(artistMax[i].item);
          break;
        // case 2:
        //   artistSeed = artistSeed.concat(artistMax[i].item + '%2C');
        //   break;
        // case 3:
        //   artistSeed = artistSeed.concat(artistMax[i].item + '%2C');
        //   break;
        // case 4:
        //   artistSeed = artistSeed.concat(artistMax[i].item);
        //   break;
      }
    }
  }
  const lastChar = artistSeed.charAt(artistSeed.length - 1);
  if (lastChar === '%') {
    artistSeed.splice(0, -1);
  }
  let trackSeed = '';

  if (trackMax[0].item !== '') {
    trackSeed = trackSeed.concat(trackMax[0].item);
  }

  dispach({
    type: SAVE_TOP_TRACKS,
    payload: trackSeed
  });
  dispach({
    type: SAVE_TOP_ARTISTS,
    payload: artistSeed
  });

};

export const grabSpotifyReccomendations = (token, userData) => dispach => {
  fetch(
    `https://api.spotify.com/v1/recommendations?limit=100&market=ES&seed_artists=${userData.artists}&seed_genres=${userData.genres}&seed_tracks=${userData.tracks}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  )
    .then(res => {
      const data = res.json();
      return data;
    })
    .then(data => {
      dispach({
        // window.location = url;
        type: SAVE_SPOTIFY_RECOMMENDATIONS,
        payload: data
      });
    })
    .catch(err => {
      console.error(err);
    });
};


export const grabSpotifyCurrentlyPlaying = token => dispach => {
  fetch('https://api.spotify.com/v1/me/player', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      const data = res.json();
      return data;
    })
    .then(data => {
      console.log(data)
      // dispach({
      //   // window.location = url;
      //   type: SAVE_SPOTIFY_CURRENTLY_PLAYING,
      //   payload: data
      // });
    })
    .catch(err => {
      console.error(err);
    });
}