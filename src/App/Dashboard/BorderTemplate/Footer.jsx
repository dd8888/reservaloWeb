import React from 'react'
class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="sticky-footer">
                <div className="container">
                    <div className="text-center">
                        <small>Copyright © Resérvalo 2020</small>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;