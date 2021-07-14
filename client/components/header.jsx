import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="container min-vw-100 headerBackground">
        <div className="row text-center">
          <div className="col">
            <h1 className="w-100 mx-auto col logo-font">MyTunes</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
