import React, { Component } from 'react';
import '../../index.css';
import './Home.css';
import HBwebsites from '../../components/HBwebsites/HBwebsites';
import HBinfosblog from '../../components/HBinfosblog/HBinfosblog';
import HBmapcountry from '../../components/HBmapcountry/HBmapcountry';
import HBtabs from '../../components/HBtabs/HBtabs';
import HBcomeback from '../../components/HBcomeback/HBcomeback';
import HBannonces from '../../components/HBannonces/HBannonces';

export default class Home extends Component {
    render() {
        let elementsAnnonce = Array(4).fill('annonce');
        let elementsLinksWeb = Array(38).fill('link');
        let elementsCountry = {
            country: "france"
        };
        let elementsSectorTabs = ["design", "ingénieur", "finance", "marketing", "programmeur", "architecture"];
        let elementsSectorContents = [
            <HBwebsites key={"pg_design"} elements={elementsLinksWeb} sector="design" nbElementsPerPage='20' />,
            <HBwebsites key={"pg_engineer"} elements={elementsLinksWeb} sector="engineer" nbElementsPerPage='20' />,
            <HBwebsites key={"pg_finance"} elements={elementsLinksWeb} sector="finance" nbElementsPerPage='20' />,
            <HBwebsites key={"pg_marketing"} elements={elementsLinksWeb} sector="marketing" nbElementsPerPage='20' />,
            <HBwebsites key={"pg_programs"} elements={elementsLinksWeb} sector="programs" nbElementsPerPage='20' />,
            <HBwebsites key={"pg_architectures"} elements={elementsLinksWeb} sector="architectures" nbElementsPerPage='20' />];

        return (
            <div className="Home">
                <section>
                    <aside className="home-aside aside-country">
                        <span className="sp_select">3. Sélectionner votre domaine.</span>
                        <HBmapcountry key={"blockcountry"} elements={elementsCountry} />
                        {/* <HBwebsites key={"pg_1"} elements={elementsAnnonce} nbElementsPerPage='1' duration="4" /> */} 
                        <HBannonces key={"pg_1"} elements={elementsAnnonce} sector="design" nbElementsPerPage='1' duration="4" />
                    </aside>
                    <article className="home-article">
                        <HBtabs elements={elementsSectorTabs} contents={elementsSectorContents} />
                    </article>

                    <aside className="home-aside aside-blog">
                        <HBinfosblog key={"blocklinks"} name="blog info" />
                    </aside>
                </section>
                <HBcomeback _to="/continent/europe" />
            </div>
        );
    }
}
