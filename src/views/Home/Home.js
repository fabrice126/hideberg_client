import React, { Component } from 'react';
import './Home.css';
import HBwebsites from '../../components/HBwebsites/HBwebsites';
import HBinfosblog from '../../components/HBinfosblog/HBinfosblog';
import HBmapcountry from '../../components/HBmapcountry/HBmapcountry';
import HBtabs from '../../components/HBtabs/HBtabs';

export default class Home extends Component {
    render() {
        let elementsAnnonce = Array(4).fill('annonce');
        let elementsLinksWeb = Array(38).fill('link');
        let elementsLinksBlogs = {
            visa: "visa",
            cv: "cv",
            news: "news"
        };
        let elementsCountry = {
            country: "france"
        };
        let elementsSectorTabs = ["design", "engineer", "finance", "marketing", "programs", "architectures"];
        let elementsSectorContents = [
            <HBwebsites key={"pg_design"} elements={elementsLinksWeb} sector="design" nbElementsPerPage='25' />,
            <HBwebsites key={"pg_engineer"} elements={elementsLinksWeb} sector="engineer" nbElementsPerPage='25' />,
            <HBwebsites key={"pg_finance"} elements={elementsLinksWeb} sector="finance" nbElementsPerPage='25' />,
            <HBwebsites key={"pg_marketing"} elements={elementsLinksWeb} sector="marketing" nbElementsPerPage='25' />,
            <HBwebsites key={"pg_programs"} elements={elementsLinksWeb} sector="programs" nbElementsPerPage='25' />,
            <HBwebsites key={"pg_architectures"} elements={elementsLinksWeb} sector="architectures" nbElementsPerPage='25' />];

        return (
            <div className="Home">
                <section>
                    <aside className="home-aside">
                        <HBmapcountry key={"blockcountry"} elements={elementsCountry} />
                        <HBwebsites key={"pg_1"} elements={elementsAnnonce} nbElementsPerPage='1' duration="4" />
                    </aside>
                    <article className="home-article">
                        <HBtabs elements={elementsSectorTabs} contents={elementsSectorContents} />
                    </article>

                    <aside className="home-aside">
                        <HBinfosblog key={"blocklinks"} name="blog info" elements={elementsLinksBlogs} />
                    </aside>
                </section>
            </div>
        );
    }
}
