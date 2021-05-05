import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DisplayResults extends React.Component {
  constructor() {
    super();
    this.handleRecommendedClick = this.handleRecommendedClick.bind(this);
    this.state = {
      name: null,
      artist: null,
      pic: null
    };
  }

  handleRecommendedClick(song) {
    // console.log(song);
    this.setState({
      name: song.name,
      artist: song.artists[0].name,
      pic: song.album.images[0].url
    });
  }

  render() {
    const recommendedSongs = this.props.spotifyRecommended.tracks;
    // console.log(this.props.spotifyRecommended)
    return (
      <div className='container background-color-2 h-100'>
        <div className='row mt-4'>
          <h3 className='w-100 text-center font-2'>Select Favorite</h3>
          <h3 className='w-100 text-center font-2'>Songs</h3>
        </div>
        <div className='col background-color-4'>
          <div className='row mb-4 mt-2 discoverRow'>
            {recommendedSongs.map(song => {
              // console.log(song)
              return (
                <div
                  className='col-2 mt-3 mr-3 ml-3 background-color-2'
                  key={song.id}
                  onClick={() => {
                    this.handleRecommendedClick(song);
                  }}
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <div className='row mt-3'>
                    <div className='col text-center'>
                      <img
                        src={song.album.images[0].url}
                        className='select-genre-image-class'
                      ></img>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <h5 className='text-center w-100 font-4'>{'Name: ' + song.name}</h5>
                    <h5 className='text-center w-100 font-4'>{'Artist: ' + song.artists[0].name}</h5>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='row'>
            {/* {this.props.genreStatus.status === true && (
                  <button
                    type='button'
                    onClick={this.filterGenreSelectionForApi}
                    className='btn font-2 buttonbackground btn-lg btn-block headerBackground w-25 mx-auto mb-4'
                  >
                    Submit
                  </button>
                )} */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    {/* <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <img
                      src={this.state.pic}
                      className='select-track-image-class'
                    ></img>
                  </div>
                  <div className="modal-footer">
                    <div className="row">

                    </div>
                    <div className="row">
                      <h5>{'Track: ' + this.state.name}</h5>
                      <h5>{'Artist: ' + this.state.artist}</h5>
                    </div>
                    <div className="row">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotifyRecommended: state.spotifyData.spotifyRecommended
});

export default connect(mapStateToProps, {})(DisplayResults);
