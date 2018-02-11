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
            user_email: null,
            user_password: null,
            user_nationality: this.tNationalities[0],
            user_affiliated_sector: this.tProfessions[0],
            user_education_level: this.tLevelStudies[0],
            user_search_sector: this.tSectors[0],
            user_destination: this.tDestinations[0],
        }
    }
    loginPrev = () => {
        let { indexVisible } = this.state;
        if (indexVisible !== 0) this.setState({ indexVisible: --indexVisible })
    }
    loginNext = () => {
        let { indexVisible, totalStep } = this.state;
        if (indexVisible <= totalStep) this.setState({ indexVisible: ++indexVisible })
    }
    postRequest = () => {
        const { user_email, user_password, user_nationality, user_affiliated_sector, user_education_level, user_search_sector, user_destination } = this.state;
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
                console.log("DANS ERROR");
                console.error(err);
            });
    }
    handleChange = (event) => this.setState({ [event.target.name]: event.target.value });
    componentDidMount = () => {
        if (this.form.childElementCount > 0) this.setState({ totalStep: this.form.childElementCount - 1 })
        else this.setState({ totalStep: 0 });
    }
    render() {
        let { indexVisible, wellSubscribe, totalStep, user_destination, user_education_level, user_search_sector, user_affiliated_sector, user_nationality } = this.state;

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
                            <form ref={(form) => { this.form = form; }} >
                                <article className={`formLogin ${indexVisible === 0 ? "current" : ""}`}>
                                    <div>
                                        <span>Email</span>
                                        <input name="user_email" type="email" placeholder="Votre email" required onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <span>Mot de passe</span>
                                        <input name="user_password" type="password" placeholder="Votre mot de passe" required onChange={this.handleChange} />
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
                            </form>
                            {totalStep !== null && this.checkButtons()}
                            {
                                /*wellSubscribe && <HBpopup msg='Félicitation vous êtes maintenant inscrit' /> && setTimeout(() => this.props.history.push('/'), 3000)*/
                            }
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
                    <button onClick={this.postRequest} type="button">Terminer</button>
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
                    <button onClick={(evt) => { this.loginNext() }} type="button">Suivant</button>
                </div>
            )
        }
    }
}