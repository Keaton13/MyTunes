import React from 'react';
import Youtube from './youtube'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class YouTubePlayer extends React.Component {
    // if (!video) {
    //     return <div>Loading ...</div>;
    // }
    constructor(props) {
        super(props);
        this.state = {
            videos: null
        }
        console.log(this.props);
        // this.handleSearch = this.handleSearch.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    // componentDidMount(){
    //     if(this.props.name){
    //         this.handleSearch(this.props.name, this.props.artist)
    //     }
    // }

    // async handleSearch (name, artist) {
    //     console.log(name);
    //     console.log(artist);
    //         const response = await Youtube.get('/search', {
    //             params: {
    //                 q: name + "" + artist,
    //                 maxResults: 1
    //             }
    //         })
    //         this.setState({
    //             videos: response.data.items
    //         })
    // }

    clearState(){
        this.setState({
            videos: null
        })
    }
    render() {
        console.log(this.props.youTubeData)
        // this.handleSearch(this.props.name, this.props.artist);
        // const videoSrc = `https://www.youtube.com/embed/HMnD95KJXhc`;
        let videoSrc = null;
        if(this.state.videos !== null){
            videoSrc = `https://www.youtube.com/embed/${this.state.videos[0].id.videoId}`
            console.log(this.state)
        }
        return (
            <div>
                <div className='ui embed player'>
                    <iframe src={videoSrc} className='iframe-custom' allowFullScreen title='Video player' />
                </div>
            </div>
        )
    }
}

YouTubePlayer.PropTypes = {
    youTubeData: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    youTubeData: state.youTubeData.youtubeSearch
  });

export default connect(mapStateToProps, {})(YouTubePlayer);