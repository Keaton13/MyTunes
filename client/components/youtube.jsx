import axios from 'axios';
const KEY = 'AIzaSyC4yXd2YzlJzEHlbcFeFoPnkNeDjGKDT4c';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 1,
        key: KEY
    }
})