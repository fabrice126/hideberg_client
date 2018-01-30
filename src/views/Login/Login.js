import React, { Component } from 'react';
import '../../index.css';
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: "hidden",
            step: 1
        }
    }

    loginNext(evt, _isNext) {
        let _step = Number(document.querySelector('#bt_finish').getAttribute('data-step'));
        let form_logins = document.querySelectorAll('.formLogin');
        console.log(_step + "/" + form_logins.length);
        console.log(this.state);

        // 1 : next : 1; back : hidden  -- bt : hidden
        // 2 : next : 2; back : 1  -- bt : hidden
        // 3 : next : hidden; back : 2  -- bt : view
        console.log('_isNext',_isNext);
        if (_step == 1) {
            console.log("_step===" + 1 + " finished");
            if (_isNext) {
                _step = 2;
            } else {
                _step = 1;
            }
            this.setState({
                hidden: "hidden"
            })
        }

        else if (_step === 2) {
            console.log("_step===" + 2 + " finished");
            if (_isNext) {
                _step = 3;
                this.setState({
                    hidden: ""
                })
            } else {
                _step = 1;
                this.setState({
                    hidden: "hidden"
                })
            }
        }

        else if (_step === 3) {
            if (_isNext) {
                _step = 3;
                this.setState({
                    hidden: ""
                })
            } else {
                _step = 2;
                this.setState({
                    hidden: "hidden"
                })
            }
        }
        console.log(this.state);


        // view form : 1, 2, 3
        form_logins.forEach((f) => {
            f.classList.remove('current');
        })
        console.log('#form_' + _step);
        document.querySelector('#form_' + _step).classList.add('current');
        document.querySelector('#bt_finish').setAttribute('data-step',_step);
    }

    postRequest(event) {
        console.log(event);
        // Pour éviter que la page ne se ré-affiche
        event.preventDefault();

        // Récupération du formulaire. Pas besoin de document.querySelector
        // ou document.getElementById puisque c'est le formulaire qui a généré
        // l'événement
        let form = event.target;
        let formJSON = {
            email: form.form_email.value,
            password: form.form_password.value,
            name: form.form_name.value,
            firstname: form.form_firstname.value,
            birthdate: form.form_birthdate.value,
            genre: form.form_genre.value,
            profession: form.form_profession.value,
            levelstudy: form.form_levelstudy.value,
            sectorf: form.form_sector.value,
            nationality: form.form_nationality.value,
            destination: form.form_destination.value
        }
        console.log(formJSON);

        // Récupération des valeurs des champs du formulaire
        // en prévision d'un envoi multipart en ajax/fetch
        let donneesFormulaire = new FormData(form);

        console.log(form);
        let url = "/api/post";

        // fetch(url, {
        //     method: "POST",
        //     body: donneesFormulaire
        // })
        // .then(function(responseJSON) {
        //     responseJSON.json()
        //         .then(function(res) {
        //             // Maintenant res est un vrai objet JavaScript
        //             afficheReponsePOST(res);
        //         });
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        // });
        return false;
    }
    render() {
        //console.log(this.state.elements);
        return (
            <div className="div-home-HBlogin">
                <section>
                    <span className="span_formTitle">Créez un compte gratuitement</span>
                    <form name="myForm" onSubmit={(evt) => { this.postRequest(evt); }} encType="multipart/form-data" method="post" >
                        <article id="form_1" className="formLogin current">
                            <div><span>Email</span><input name="form_email" type="email" id="form_email" placeholder="" required /></div>
                            {/* <div><span>Email de confirmation</span><input name="form_email" type="email" id="form_email" placeholder="" required /></div> */}
                            <div><span>Mot de passe</span><input name="form_password" type="password" id="form_password" placeholder="" required /></div>
                        </article>

                        <article id="form_2" className="formLogin">
                            {/* <div><span>Nom</span><input name="form_name" type="text" placeholder="" /></div>
                            <div><span>Prénom</span><input name="form_firstname" type="text" placeholder="" /></div> */}
                            {/* <div>
                                <span>Genre</span>
                                <div className="div_genre">
                                    <label htmlFor="genre_male"><input id="genre_male" name="form_genre" type="radio" value="male" /> Homme</label>
                                    <label htmlFor="genre_female"><input id="genre_female" name="form_genre" type="radio" value="female" /> Femme</label>
                                </div>
                            </div>

                            <div><span>Date de naissance</span><input name="form_birthdate" type="date" /></div> */}

                            <div>
                                <span>Nationalité</span>
                                <select name="form_nationality">
                                    <option>France</option>
                                    <option>Espagne</option>
                                    <option>Chine</option>
                                </select>
                            </div>

                            <div>
                                <span>Profession</span>
                                <select name="form_profession">
                                    <option>Etudiant</option>
                                    <option>Profesionnel</option>
                                    <option>Demandeur d’emploi(e)</option>
                                    <option>Autre(s)</option>
                                </select>
                            </div>

                            <div>
                                <span>Niveau d’étude</span>
                                <select name="form_levelstudy">
                                    <option>BAC</option>
                                    <option>BTS / BTEC Higher National Diploma</option>
                                    <option>Licence / BA / BS / BSc</option>
                                    <option>Master / MS / MSc / MA</option>
                                    <option>Diplôme d’ingénieur / Master’s Degree in Engineering</option>
                                    <option>Doctorat / PhD</option>
                                </select>
                            </div>

                            <div>
                                <span>Secteur recherché</span>
                                <select name="form_sector">
                                    <option>Design</option>
                                    <option>Programmation</option>
                                    <option>Ingénierie</option>
                                    <option>Marketing</option>
                                    <option>Architecture</option>
                                    <option>Finance</option>
                                </select>
                            </div>

                            <div>
                                <span>Destination désirée</span>
                                <select name="form_destination">
                                    <option>France</option>
                                    <option>Espagne</option>
                                    <option>Chine</option>
                                </select>
                            </div>
                        <button id="bt_finish" data-step="1" className={this.state.hidden}>Terminer</button>
                        </article>
                    </form>
                    <div className="div_button">
                        <button id="bt_loginBack" onClick={(evt) => { this.loginNext(evt, false) }} type="button">Précédent</button>
                        <button id="bt_loginNext" onClick={(evt) => { this.loginNext(evt, true) }} type="button">Suivant</button>
                    </div>
                </section>

            </div>
        )
    }
}