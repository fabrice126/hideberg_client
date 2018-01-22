import React, { Component } from 'react';
import './HBwebsites.css';

class HBwebsites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: this.props.elements,
            nbContentTotal: this.props.elements.length,
            nbContentTotalPerPage: this.props.nbElementsPerPage,
            pageNumTotal: Math.ceil(this.props.elements.length / this.props.nbElementsPerPage),
            duration: (this.props.duration || 0)
        }

        if (this.props.duration) this.doAnimation();
        //console.log(this.refs);
    }

    doAnimation() {
        let _numPage = 0;
        let refreshAnnonce = setInterval(() => {
            this.viewPage(_numPage);
            if (_numPage >= this.state.pageNumTotal - 1) _numPage = 0;
            else _numPage++;
        }, (parseInt(this.props.duration) * 1000));
    }

    viewPage(_pageNum) {
        //console.log(this.refs.myApp);
        this.refs.myApp.querySelectorAll('ul.ul_content').forEach(ul => {
            if (ul.id === 'page_' + _pageNum) {
                if (!ul.classList.contains('current')) ul.classList.add('current');
            } else {
                if (ul.classList.contains('current')) ul.classList.remove('current');
            }
        });
        this.refs.myApp.querySelectorAll('button.bt_tablinks').forEach(el => {
            if (el.id === 'bt_' + _pageNum) {
                if (!el.classList.contains('active')) el.classList.add('active');
            } else {
                if (el.classList.contains('active')) el.classList.remove('active');
            }
        });
    }

    getLi(nbContentVisible, pageNum, nbContentVisibleMax) {
        let tabLi = [];
        for (nbContentVisible = (pageNum * this.state.nbContentTotalPerPage); nbContentVisible < nbContentVisibleMax; nbContentVisible++) {
            tabLi.push(<li key={"li_" + nbContentVisible}>{this.state.elements[nbContentVisible] + " " + (nbContentVisible + 1)}</li>);
        }
        return tabLi;
    }

    render() {
        let nbContentVisible = 0;
        let nbContentVisibleMax = 0;

        let _listContent = [];
        let _listPagination = [];

        let classCurrent = "current";
        let classAnnonce = "";
        let classActive = "active";
        if (this.props.duration) {
            classAnnonce="annonce";
        }
        let btContent="";

        for (let pageNum = 0; pageNum < this.state.pageNumTotal; pageNum++) {
            if (pageNum !== 0) {
                classCurrent = " ";
                classActive = " ";
            }
            nbContentVisibleMax = (((pageNum + 1) * this.state.nbContentTotalPerPage) < this.state.nbContentTotal) ? ((pageNum + 1) * this.state.nbContentTotalPerPage) : (this.state.nbContentTotal);

            _listContent.push(<ul id={'page_' + pageNum} key={pageNum} className={'ul_content ' + classCurrent+' '+classAnnonce}>{
                this.getLi(nbContentVisible, pageNum, nbContentVisibleMax)
            }</ul>)
            if (!this.props.duration) btContent=pageNum+1;
            _listPagination.push(<button id={'bt_' + pageNum} key={'bt_' + pageNum} onClick={(evt) => this.viewPage(pageNum)} className={"bt_tablinks "+classActive}>{btContent}</button>)
        }
        return (
            <div className={"div-app-HBwebsites "+classAnnonce} ref="myApp">
                <article id='home'>{_listContent}</article>
                <nav id='pagination'>{_listPagination}</nav>
            </div>
        )
    }
}
export default HBwebsites;