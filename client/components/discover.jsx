import React from 'react';
import SelectGenre from './select-genre';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Discover extends React.Component {
  render() {
    return (
      <div className="col-8">
        <div className="row background-color-2">
          <h3 className="w-100 text-center font-2 mt-3 mb-3">Discover</h3>
        </div>
        <div className="row">
          <div className="col ml-2 mr-2 background-color-4">
            <SelectGenre />
          </div>
        </div>
      </div>
    );
  }
}

export default Discover;
