import React, { Component } from 'react';
import './HBerror.css';
import { withRouter } from 'react-router'

class HBerror extends Component {

    componentDidMount() {
        this.myRedirect = setTimeout(() => {
            this.props.history.push('/');
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.myRedirect);
    }

    render() {
        let _errMsg=this.props.errMsg;
        let _errIMG = <img src="/images/icons/soon_icons.svg" alt="{_errMsg}" />;
        if (_errMsg===404 || !_errMsg) {
            _errMsg="404 not found";
            _errIMG = <img src="/images/icons/404_icons.svg" alt="{_errMsg}" />;
        }
        return (
            <section className="div-home-HBerror">
                {_errIMG}
                <span className="span_main">{_errMsg}</span>
                <span className="span_redirect">Vous allez être redirigé vers la page d'accueil</span>
            </section>
        )
    }
}

export default withRouter(HBerror)