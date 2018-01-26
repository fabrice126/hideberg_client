import React, { Component } from 'react';
import './HBerror.css';
import { withRouter } from 'react-router'

class HBerror extends Component {

    componentDidMount() {
        this.myRedirect=setTimeout(() => {
            this.props.history.push('/');
        }, 3000);
    }

    componentWillUnmount(){
        clearInterval(this.myRedirect);
    }

    render() {
        return (
            <section className="div-home-HBerror">
                <span className="span_main">{this.props.errMsg || "Une erreur est surevenue"}</span>
                <span className="span_redirect">Vous allez être redirigé vers la page d'accueil</span>
            </section>
        )
    }
}

export default withRouter(HBerror)