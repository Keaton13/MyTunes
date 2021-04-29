import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { genreReady, genreUnready } from '../redux/actions/genreActions';
import { grabSpotifyReccomendations } from '../redux/actions/spotifyActions';

class SelectGenre extends React.Component {
  constructor() {
    super();
    this.state = {
      genres: [
        {
          id: 1,
          name: 'ambient',
          image:
            'https://ma-hub.imgix.net/wp-images/2019/05/29222105/royalty-free-music-Ambient.jpg',
          checked: false
        },
        {
          id: 2,
          name: 'bluegrass',
          image:
            'https://www.cmuse.org/wp-content/uploads/2018/11/famous-bluegrass-music.jpg',
          checked: false
        },
        {
          id: 3,
          name: 'blues',
          image:
            'https://blackmusicscholar.com/wp-content/uploads/2019/04/Blues.jpg',
          checked: false
        },
        {
          id: 4,
          name: 'classical',
          image: 'https://i.ytimg.com/vi/Vtmmly29QJ0/maxresdefault.jpg',
          checked: false
        },
        {
          id: 5,
          name: 'country',
          image:
            'https://d279m997dpfwgl.cloudfront.net/wp/2019/03/ap-guitar-1129349_1920-1000x666.jpg',
          checked: false
        },
        {
          id: 6,
          name: 'dance',
          image:
            'https://miro.medium.com/max/7818/1*MHLScq2WZ4dRkxByxDGf7w.jpeg',
          checked: false
        },
        {
          id: 7,
          name: 'deep-House',
          image:
            'https://i.scdn.co/image/ab67706f0000000388165523fdefdb36279ffb99',
          checked: false
        },
        {
          id: 8,
          name: 'disco',
          image:
            'https://www.capesymphony.org/images/news/201819Season/CS_Blog18_DiscoBall_582x419.jpg',
          checked: false
        },
        {
          id: 9,
          name: 'dubstep',
          image:
            'https://miro.medium.com/max/1600/1*6NH1oaFF2DD-UAFSnyHUlQ.jpeg',
          checked: false
        },
        {
          id: 10,
          name: 'edm',
          image: 'https://i.ytimg.com/vi/DBW-Rq4iEhQ/maxresdefault.jpg',
          checked: false
        },
        {
          id: 11,
          name: 'folk',
          image:
            'https://mediad.publicbroadcasting.net/p/shared/npr/styles/x_large/nprshared/201607/487491474.jpg',
          checked: false
        },
        {
          id: 12,
          name: 'funk',
          image:
            'https://images.squarespace-cdn.com/content/v1/5183a6f4e4b0580e0005cd82/1470615772091-NLD4RQ6NJ6SMGZYQSWA0/ke17ZwdGBToddI8pDm48kMI9s7jxY4K0vTawUOrFA1B7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0geeCvn1f36QDdcifB7yxGh2W8JYfYeTXBuAJ1oBJ49qP-rKsfKAGaY7SAQwLTOalA/Funk%21+Cover+Final.jpg?format=1000w',
          checked: false
        },
        {
          id: 13,
          name: 'hip-hop',
          image:
            'https://cdn.aarp.net/content/dam/aarp/entertainment/music/2019/11/1140x655-hip-hop-banner.imgcache.rev.web.900.518.jpg',
          checked: false
        },
        {
          id: 14,
          name: 'indie',
          image:
            'https://video-images.vice.com/articles/58755782b6948154d919afd3/lede/Indie-music-is-still-cool-art.jpg?crop=1xw:0.4956471271038886xh;center,center',
          checked: false
        },
        {
          id: 15,
          name: 'jazz',
          image:
            'https://www.udiscovermusic.com/wp-content/uploads/2019/04/best-jazz-songs.jpg',
          checked: false
        },
        {
          id: 16,
          name: 'metal',
          image:
            'https://www.thesmartset.com/wp-content/uploads/2016/06/SL_RO_METAL_FI_002.jpg',
          checked: false
        },
        {
          id: 17,
          name: 'pop',
          image:
            'https://store-images.s-microsoft.com/image/apps.37854.13935209865926328.412d2b3e-6876-407b-a53d-e47e3d32537c.1d72c587-5330-4900-ab96-10f2ed727cae?mode=scale&q=90&h=200&w=200&background=%23ffffff',
          checked: false
        },
        {
          id: 18,
          name: 'reggae',
          image:
            'https://c.files.bbci.co.uk/6C73/production/_104536772_bob_getty.jpg',
          checked: false
        },
        {
          id: 19,
          name: 'rock',
          image:
            'https://akm-img-a-in.tosshub.com/indiatoday/music-day-story,-facebook_647_062116084641.jpg?wqTCLtMqwQpeuevah3aCZLvcopVtZz24&size=770:433',
          checked: false
        },
        {
          id: 20,
          name: 'salsa',
          image:
            'https://cacm.acm.org/system/assets/0003/8417/101920_Getty_Understanding-Salsa.large.jpg?1603223440&1603223440',
          checked: false
        }
      ],
      checked: []
    };
    this.handleGenreClick = this.handleGenreClick.bind(this);
    this.sendUserGenres = this.sendUserGenres.bind(this);
    this.filterGenreSelectionForApi = this.filterGenreSelectionForApi.bind(this);
  }

  handleGenreClick(key) {
    // console.log(key);
    const genres = this.state.genres;
    let checked = this.state.checked;
    if (genres[key - 1].checked === true) {
      genres[key - 1].checked = false;
      for (let i = 0; i < checked.length; i++) {
        // console.log(checked[i]);
        if (checked[i].id === key) {
          checked.splice(i, 1);
          this.props.genreUnready();
        }
        // checked = checked.splice(key - 1)
      }
    } else {
      if (checked.length < 2) {
        genres[key - 1].checked = true;
        checked = this.state.checked.concat(genres[key - 1]);
        if (checked.length === 2) {
          this.props.genreReady();
        } else {
          this.props.genreUnready();
        }
      } else {
        this.props.genreReady();
      }
    }
    this.setState({
      genres: genres,
      checked: checked
    });
  }

  filterGenreSelectionForApi() {
    const genres = this.state.checked;
    let genreSeed = '';
    for (let i = 0; i < genres.length; i++) {
      switch (i) {
        case 0:
          genreSeed = genreSeed.concat(genres[i].name + '%2C');
          break;
        case 1:
          genreSeed = genreSeed.concat(genres[i].name);
          break;
      }
    }
    this.sendUserGenres(genreSeed);
  }

  sendUserGenres(genreSeed) {
    const userData = {
      tracks: this.props.topTracks,
      artists: this.props.topArtists,
      genres: genreSeed
    };
    this.props.grabSpotifyReccomendations(this.props.token.token, userData);
  }

  render() {
    const genres = this.state.genres;

    return (
      <div className='container background-color-2 h-100'>
        <div className='row mt-4'>
          <h3 className='w-100 text-center font-2'>Select Favorite</h3>
          <h3 className='w-100 text-center font-2'>Genres</h3>
        </div>
        <div className='col background-color-4'>
          <div className='row mb-4 mt-2 discoverRow'>
            {genres.map(genre => {
              let classes;
              {
                if (genre.checked === true) {
                  classes = 'col-2 mt-3 mr-3 ml-3 background-color-2 opacity';
                } else {
                  classes = 'col-2 mt-3 mr-3 ml-3 background-color-2';
                }
              }
              return (
                <div
                  className={classes}
                  key={genre.id}
                  onClick={() => {
                    this.handleGenreClick(genre.id);
                  }}
                >
                  <div className='row mt-3'>
                    <div className='col text-center'>
                      <img
                        src={genre.image}
                        className='select-genre-image-class'
                      ></img>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <h5 className='text-center w-100 font-3'>{genre.name}</h5>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='row'>
            {this.props.genreStatus.status === true && (
              <button
                type='button'
                onClick={this.filterGenreSelectionForApi}
                className='btn font-2 buttonbackground btn-lg btn-block headerBackground w-25 mx-auto mb-4'
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

SelectGenre.propType = {
  genreReady: PropTypes.func.isRequired,
  genreUnready: PropTypes.func.isRequired,
  grabSpotifyReccomendations: PropTypes.func.isRequired,
  genreStatus: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  genreStatus: state.genreData.genreSelect,
  topTracks: state.spotifyData.topTracks,
  topArtists: state.spotifyData.topArtists,
  token: state.spotifyData.tokenData
});

export default connect(
  mapStateToProps,
  { genreReady, genreUnready, grabSpotifyReccomendations }
)(SelectGenre);
