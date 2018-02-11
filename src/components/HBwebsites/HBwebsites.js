import React, { Component } from 'react';
import './HBwebsites.css';
import { Link } from 'react-router-dom';

class HBwebsites extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            elements: this.props.elements,
            nbContentTotal: this.props.elements.length,
            nbContentTotalPerPage: this.props.nbElementsPerPage,
            pageNumTotal: Math.ceil(this.props.elements.length / this.props.nbElementsPerPage),
            duration: (this.props.duration || 0),
            sector: this.props.sector,
            elementsJSON: null
        }
    }
    componentDidMount() {
        if (this.props.duration) this.doAnimation();
        console.log(process.env.REACT_APP_API_HOST);
        fetch(`${process.env.REACT_APP_API_HOST}/api/continent/europe/country/france/sector/${this.props.sector}/websites`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    elementsJSON: data,
                    nbContentTotal: data.length,
                    pageNumTotal: Math.ceil(data.length / this.props.nbElementsPerPage)
                });
            });

    }

    componentWillUnmount() {
        if (this.props.duration) clearInterval(this.refreshAnnonce);
    }

    doAnimation() {
        let _numPage = 0;
        this.refreshAnnonce = setInterval(() => {
            this.viewPage(_numPage);
            if (_numPage >= this.state.pageNumTotal - 1) _numPage = 0;
            else _numPage++;
        }, Number(this.props.duration) * 1000);
    }

    viewPage(_pageNum) {
        this.refs.myhome.querySelectorAll('ul.ul_content').forEach(ul => {
            if (ul.id === 'page_' + _pageNum) {
                if (!ul.classList.contains('current')) ul.classList.add('current');
            } else {
                if (ul.classList.contains('current')) ul.classList.remove('current');
            }
        });
        this.refs.myhome.querySelectorAll('button.bt_tablinks').forEach(el => {
            if (el.id === 'bt_' + _pageNum) {
                if (!el.classList.contains('active')) el.classList.add('active');
            } else {
                if (el.classList.contains('active')) el.classList.remove('active');
            }
        });
    }

    getLi(pageNum, nbContentVisibleMax) {
        let tabLi = [];
        let data = this.state.elementsJSON;
        for (let i in data) {
            if (i >= (pageNum * this.state.nbContentTotalPerPage) && i < nbContentVisibleMax) {
                tabLi.push(
                    <li key={"li_" + i}>
                        <Link to={data[i].link_url} target="_blank" key={"a_" + i}>
                            <img src={`/images/website/${data[i].website_label}.png`} alt={data[i].website_label} />
                        </Link>
                    </li>
                );
            }
        }
        return tabLi;
    }

    render() {
        let nbContentVisibleMax = 0;

        let _listContent = [];
        let _listPagination = [];

        let classCurrent = "current";
        let classAnnonce = "";
        let classActive = "active";
        if (this.props.duration) {
            classAnnonce = "annonce";
        }
        let btContent = "";

        for (let pageNum = 0; pageNum < this.state.pageNumTotal; pageNum++) {
            if (pageNum !== 0) {
                classCurrent = " ";
                classActive = " ";
            }
            nbContentVisibleMax = (((pageNum + 1) * this.state.nbContentTotalPerPage) < this.state.nbContentTotal) ? ((pageNum + 1) * this.state.nbContentTotalPerPage) : (this.state.nbContentTotal);

            _listContent.push(<ul id={'page_' + pageNum} key={pageNum} className={'ul_content ' + classCurrent + ' ' + classAnnonce}>{
                this.getLi(pageNum, nbContentVisibleMax)
            }</ul>)
            if (!this.props.duration) btContent = pageNum + 1;
            if (this.state.pageNumTotal > 1) _listPagination.push(<button id={'bt_' + pageNum} key={'bt_' + pageNum} onClick={(evt) => this.viewPage(pageNum)} className={"bt_tablinks " + classActive}>{btContent}</button>)
        }
        return (
            <div className={"div-home-HBwebsites " + classAnnonce} ref="myhome">
                <article id='home'>{_listContent}</article>
                <nav id='pagination'>{_listPagination}</nav>
            </div>
        )
    }
}
export default HBwebsites;