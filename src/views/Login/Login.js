import React, { Component } from 'react';
import '../../index.css';
import './Login.css';
export default class Login extends Component {
    constructor(props) {
        super(props);
        //Ces tableaux seront chargés via une requete
        this.tDestinations = ["France", "Espagne", "Portugal", "Italie", "Suisse", "Allemagne"];
        this.tSectors = ["Design", "Programmation", "Ingénierie", "Marketing", "Architecture", "Finance"];
        this.tLevelStudies = ["BAC", "BTS / BTEC Higher National Diploma", "Licence / BA / BS / BSc", "Master / MS / MSc / MA", "Diplôme d’ingénieur / Master’s Degree in Engineering", "Doctorat / PhD"];
        this.tProfessions = ["Etudiant", "Profesionnel", "Demandeur d’emploi(e)", "Autre(s)"];
        this.tNationalities = [...this.tDestinations];
        this.state = {
            indexVisible: 0,
            totalStep: null,
            form_email: null,
            form_password: null,
            form_nationality: this.tNationalities[0],
            form_profession: this.tProfessions[0],
            form_levelstudy: this.tLevelStudies[0],
            form_sector: this.tSectors[0],
            form_destination: this.tDestinations[0],
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
        const { form_email, form_password, form_nationality, form_profession, form_levelstudy, form_sector, form_destination } = this.state;
        let formJSON = {
            user_email: form_email,
            user_password: form_password,
            user_affiliated_sector: form_profession,
            user_education_level: form_levelstudy,
            user_search_sector: form_sector,
            user_nationality: form_nationality,
            user_destination: form_destination
        }
        console.log(formJSON);
        // Récupération des valeurs des champs du formulaire
        fetch("http://127.0.0.1:5001/api/signup", {
            method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formJSON)
        }).then((res) => res.json())
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    }
    handleChange = (event) => this.setState({ [event.target.name]: event.target.value });
    componentDidMount = () => {
        if (this.form.childElementCount > 0) this.setState({ totalStep: this.form.childElementCount - 1 })
        else this.setState({ totalStep: 0 });
    }
    render() {
        let { indexVisible, totalStep, form_destination, form_levelstudy, form_sector, form_profession, form_nationality } = this.state;
        return (
            <div className="div-home-HBlogin">
                <section>
                    <span className="span_formTitle">Créez un compte gratuitement</span>
                    <form ref={(form) => { this.form = form; }} >
                        <article className={`formLogin ${indexVisible === 0 ? "current" : ""}`}>
                            <div>
                                <span>Email</span>
                                <input name="form_email" type="email" placeholder="Votre email" required onChange={this.handleChange} />
                            </div>
                            <div>
                                <span>Mot de passe</span>
                                <input name="form_password" type="password" placeholder="Votre mot de passe" required onChange={this.handleChange} />
                            </div>
                        </article>
                        <article className={`formLogin ${indexVisible === 1 ? "current" : ""}`}>
                            <div>
                                <span>Nationalité</span>
                                <select value={form_nationality} name="form_nationality" onChange={this.handleChange}>
                                    {this.tNationalities.map((nationality, i) => <option key={i}>{nationality}</option>)}
                                </select>
                            </div>
                            <div>
                                <span>Profession</span>
                                <select value={form_profession} name="form_profession" onChange={this.handleChange}>
                                    {this.tProfessions.map((profession, i) => <option key={i}>{profession}</option>)}
                                </select>
                            </div>
                            <div>
                                <span>Niveau d’étude</span>
                                <select value={form_levelstudy} name="form_levelstudy" onChange={this.handleChange}>
                                    {this.tLevelStudies.map((levelstudy, i) => <option key={i}>{levelstudy}</option>)}
                                </select>
                            </div>
                            <div>
                                <span>Secteur recherché</span>
                                <select value={form_sector} name="form_sector" onChange={this.handleChange}>
                                    {this.tSectors.map((sector, i) => <option key={i}>{sector}</option>)}
                                </select>
                            </div>
                            <div>
                                <span>Destination désirée</span>
                                <select value={form_destination} name="form_destination" onChange={this.handleChange}>
                                    {this.tDestinations.map((destination, i) => <option key={i}>{destination}</option>)}
                                </select>
                            </div>
                        </article>
                    </form>
                    {totalStep !== null ? this.checkButtons() : ""}
                </section>
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