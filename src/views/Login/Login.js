import React, { Component } from 'react';
import '../../index.css';
import './Login.css';
import HBpopup from '../../components/HBpopup/HBpopup';

export default class Login extends Component {
    constructor(props) {
        super(props);
        //Ces tableaux seront chargés via une requete
        this.tDestinations = ["Allemagne", "Autriche", "Belgique", "Espagne", "France", "Grande-Bretagne", "Hongrie", "Irlande", "Italie", "Luxembourg", "Pays-Bas", "Portugal", "Suisse"];
        this.tSectors = ["Design", "Programmation", "Ingénierie", "Marketing", "Architecture", "Finance"];
        this.tLevelStudies = ["BAC", "BTS / BTEC Higher National Diploma", "Licence / BA / BS / BSc", "Master / MS / MSc / MA", "Diplôme d’ingénieur / Master’s Degree in Engineering", "Doctorat / PhD"];
        this.tProfessions = ["Etudiant", "Profesionnel", "Demandeur d’emploi(e)", "Autre(s)"];
        this.tNationalities = [...this.tDestinations];
        this.state = {
            wellSubscribe: false,
            indexVisible: 0,
            totalStep: null,
            user_email_valid: true,
            user_password_valid: true,
            user_email: "",
            user_password: "",
            user_nationality: this.tNationalities[0],
            user_affiliated_sector: this.tProfessions[0],
            user_education_level: this.tLevelStudies[0],
            user_search_sector: this.tSectors[0],
            user_destination: this.tDestinations[0],
        }

        document.addEventListener("keydown", (event) => {
            console.log(event.which);
            if (event.which === 13) this.loginNext();
        });
    }
    
    loginPrev = () => {
        let { indexVisible } = this.state;
        if (indexVisible !== 0) this.setState({ indexVisible: --indexVisible })
    }
    loginNext = () => {
        let { indexVisible, totalStep, user_email_valid, user_password_valid } = this.state;
        let hasError = false;
        if (indexVisible === 0) {
            if (this.emailInput.validity.patternMismatch || this.emailInput.validity.valueMissing ||
                this.emailInput.validity.tooLong || this.emailInput.validity.tooShort || this.emailInput.validity.typeMismatch) {
                hasError = true;
                if (user_email_valid === true) this.setState({ user_email_valid: false })
            } else {
                if (user_email_valid === false) this.setState({ user_email_valid: true })
            }
            if (this.passwordInput.validity.patternMismatch || this.passwordInput.validity.valueMissing ||
                this.passwordInput.validity.tooLong || this.passwordInput.validity.tooShort || this.passwordInput.validity.typeMismatch) {
                if (user_password_valid === true) this.setState({ user_password_valid: false })
                hasError = true;
            } else {
                if (user_password_valid === false) this.setState({ user_password_valid: true })
            }
        }
        //S'il n'y a pas d'erreur on active le bouton
        if (indexVisible <= totalStep && !hasError) this.setState({ indexVisible: ++indexVisible })
    }
    postRequest = (e) => {
        const { user_email,
            user_password,
            user_nationality,
            user_affiliated_sector,
            user_education_level,
            user_search_sector,
            user_destination } = this.state;
        let formJSON = {
            user_email, user_password, user_affiliated_sector, user_education_level, user_search_sector, user_nationality, user_destination
        }
        // Récupération des valeurs des champs du formulaire
        fetch(`${process.env.REACT_APP_API_HOST}/api/signup`, {
            method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formJSON)
        }).then((res) => res.json())
            .then((res) => {
                if (!res.token) throw res.error_msg;
                localStorage.setItem("token", res.token);
                this.setState({ wellSubscribe: true });
            })
            .catch((err) => {
                //Afficher un toast indiquant l'erreur
                console.error(err);
            });
        e.preventDefault()
    }
    handleChange = (event) => this.setState({ [event.target.name]: event.target.value });
    componentDidMount = () => {
        if (this.formInput.childElementCount > 0) this.setState({ totalStep: this.formInput.childElementCount - 1 })
        else this.setState({ totalStep: 0 });
    }
    render() {
        let { indexVisible,
            wellSubscribe,
            user_password_valid,
            user_email_valid,
            totalStep,
            user_email,
            user_password,
            user_destination,
            user_education_level,
            user_search_sector,
            user_affiliated_sector,
            user_nationality } = this.state;
        return (
            <div className="div-home-HBlogin">
                {
                    wellSubscribe ?
                        <section>
                            <span className="span_formTitle">
                                <HBpopup img={"/images/icons/welcome.svg"} msg={'Bienvenue'} />
                            </span>
                            {setTimeout(() => this.props.history.push('/'), 3000)}
                        </section>
                        :
                        <section>
                            <span className="span_formTitle">Créez un compte gratuitement</span>
                            <form onSubmit={this.postRequest} ref={(form) => { this.formInput = form; }} >
                                <article className={`formLogin ${indexVisible === 0 ? "current" : ""}`}>
                                    <div>
                                        <span>Email</span>
                                        <input name="user_email" type="email" minLength="5" maxLength="64"
                                            value={user_email}
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                                            title="Veuillez saisir votre email" placeholder="Votre email"
                                            ref={(input) => { this.emailInput = input; }}
                                            required onChange={this.handleChange} />
                                        {!user_email_valid && <span className="errorMessage">Veuillez saisir un email valide</span>}
                                    </div>
                                    <div>
                                        <span>Mot de passe</span>
                                        <input name="user_password" type="password" minLength="4" maxLength="64"
                                            value={user_password}
                                            title="Veuillez saisir un mot de passe d'au moins 4 caractères" placeholder="Votre mot de passe"
                                            ref={(input) => { this.passwordInput = input; }}
                                            required onChange={this.handleChange} />
                                        {!user_password_valid && <span className="errorMessage">Veuillez saisir un mot de passe de plus de 4 caractères</span>}
                                    </div>
                                </article>
                                <article className={`formLogin ${indexVisible === 1 ? "current" : ""}`}>
                                    <div>
                                        <span>Nationalité</span>
                                        <select value={user_nationality} name="user_nationality" onChange={this.handleChange}>
                                            {this.tNationalities.map((nationality, i) => <option key={i}>{nationality}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <span>Profession</span>
                                        <select value={user_affiliated_sector} name="user_affiliated_sector" onChange={this.handleChange}>
                                            {this.tProfessions.map((profession, i) => <option key={i}>{profession}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <span>Niveau d’étude</span>
                                        <select value={user_education_level} name="user_education_level" onChange={this.handleChange}>
                                            {this.tLevelStudies.map((levelstudy, i) => <option key={i}>{levelstudy}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <span>Secteur recherché</span>
                                        <select value={user_search_sector} name="user_search_sector" onChange={this.handleChange}>
                                            {this.tSectors.map((sector, i) => <option key={i}>{sector}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <span>Destination désirée</span>
                                        <select value={user_destination} name="user_destination" onChange={this.handleChange}>
                                            {this.tDestinations.map((destination, i) => <option key={i}>{destination}</option>)}
                                        </select>
                                    </div>
                                </article>
                                {totalStep !== null && this.checkButtons()}
                            </form>
                        </section>
                }
            </div>
        )
    }
    checkButtons = () => {
        const { indexVisible, totalStep } = this.state;
        if (indexVisible === totalStep) {
            //On affiche le bouton terminé
            return (
                <div className="div_button">
                    <button onClick={this.loginPrev} type="button">Précédent</button>
                    <button type="submit">Terminer</button>
                </div>
            )
        }
        else if (indexVisible > 0) {
            //On affiche le bouton précédent et suivant
            return (
                <div className="div_button">
                    <button onClick={this.loginPrev} type="button">Précédent</button>
                    <button onClick={this.loginNext} type="button">Suivant</button>
                </div>
            )
        }
        else {
            //On affiche le bouton suivant
            return (
                <div className="div_button">
                    <button onClick={this.loginNext} type="button">Suivant</button>
                </div>
            )
        }
    }
}