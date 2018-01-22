import React, { Component } from 'react';
import './HBtabs.css';

class HBtabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: this.props.elements,
            contents: this.props.contents
        }
    }

    viewPage(_pageNum) {
        //console.log(this.refs.myApp);
        this.refs.myTabs.querySelectorAll('article.article_content').forEach(el => {
            if (el.id === 'article_' + _pageNum) {
                if (!el.classList.contains('current')) el.classList.add('current');
            } else {
                if (el.classList.contains('current')) el.classList.remove('current');
            }
        });
        this.refs.myTabs.querySelectorAll('button.bt_tablinks').forEach(el => {
            if (el.id === 'bt_' + _pageNum) {
                if (!el.classList.contains('active')) el.classList.add('active');
            } else {
                if (el.classList.contains('active')) el.classList.remove('active');
            }
        });
    }

    render() {
        let tabs = [];
        let article = [];
        let classCurrent = "current";
        let classActive = "active";

        for (let tabNum = 0; tabNum < this.state.elements.length; tabNum++) {
            if (tabNum !== 0) {
                classCurrent = " ";
                classActive = " ";
            }
            tabs.push(<button id={"bt_" + tabNum} key={"bt_" + tabNum} onClick={(evt) => this.viewPage(tabNum)} className={"bt_tablinks " + classActive}>{this.state.elements[tabNum]}</button>);
            article.push(<article id={"article_" + tabNum} key={"article_" + tabNum} className={"article_content " + classCurrent}>{this.state.contents[tabNum]}</article>);
        }
        return (
            <div className="div-app-HBtabs" ref="myTabs">
                <nav>{tabs}</nav>
                <section>{article}</section>
            </div>
        )
    }
}
export default HBtabs;