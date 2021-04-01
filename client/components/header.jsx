import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="container min-vw-100 headerBackground">
        <div className="row text-center">
          <div className="col-8">
            <h1 className="w-50 mx-auto col float-right logo-font">MyTunes</h1>
          </div>
          <div className="col-4">
            {/* <img src=""></img>
                        <h3>Modzzz</h3> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
