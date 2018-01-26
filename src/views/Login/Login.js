import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: this.props.elements
        }

        this.data_form = 0;
    }

    loginNext(evt) {
        this.data_form = Number(evt.target.getAttribute('data-form'));
        let form_logins = document.querySelectorAll('.formLogin');
        if (this.data_form === form_logins.length) this.data_form = 0;
        this.data_form++;
        evt.target.setAttribute('data-form', this.data_form);
        form_logins.forEach((f) => {
            f.classList.remove('current');
        })
        document.querySelector('#form_' + this.data_form).classList.add('current');
    }

    render() {
        //console.log(this.state.elements);
        return (
            <div className="div-home-HBlogin">

                <section>

                    <form id="form_1" className="formLogin current">
                        <div><span>Nom</span><input type="text" placeholder="" /></div>
                        <div><span>Prénom</span><input type="text" placeholder="" /></div>
                        <div><span>Email</span><input type="email" placeholder="" /></div>
                    </form>

                    <form id="form_2" className="formLogin">
                        <div><span>Date de naissance</span><input type="date" /></div>
                        <div>
                            <span>Genre</span>
                            <div className="div_genre">
                                <label htmlFor="genre_male"><input id="genre_male" name="genre" type="radio" /> Homme</label>
                                <label htmlFor="genre_female"><input id="genre_female" name="genre" type="radio" /> Femme</label>
                            </div>
                        </div>
                        <div>
                            <span>Statut familiale</span>
                            <select>
                                <option>Célibataire</option>
                                <option>En couple</option>
                                <option>Marié(e)</option>
                            </select>
                        </div>
                        <div>
                            <span>Nationalité</span>
                            <select>
                                <option>France</option>
                                <option>Espagne</option>
                                <option>Chine</option>
                            </select>
                        </div>
                    </form>

                    <form id="form_3" className="formLogin">
                        <div>
                            <span>Profession</span>
                            <select>
                                <option>Etudiant</option>
                                <option>Profesionnel</option>
                                <option>Demandeur d’emploi(e)</option>
                                <option>Autre(s)</option>
                            </select>
                        </div>

                        <div>
                            <span>Niveau d’étude</span>
                            <select>
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
                            <select>
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
                            <select>
                                <option>France</option>
                                <option>Espagne</option>
                                <option>Chine</option>
                            </select>
                        </div>
                    </form>
                    <button id="bt_loginNext" data-form="1" onClick={(evt)=>{this.loginNext(evt)}}>Suivant (1/3)</button>
                </section>

            </div>
        )
    }
}