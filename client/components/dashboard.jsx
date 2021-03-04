import React from 'react';
import Header from './header';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container min-vw-100">
                    <div className="row background-color-1">
                        <div className="col-8 sign-up-row-height text-center font-2">
                            <h3 className="my-auto">Most Played</h3>
                        </div>
                        <div className="col-4 sign-up-row-height">
                            <h3 className="text-center font-2">Recently Played</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard