import React, { Component } from 'react';
import './HBannonces.css';

class HBannonces extends Component {
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
        let _url = `http://localhost:5001/api/continent/europe/country/france/sector/${this.props.sector}/annonces`;
        console.log(_url);
        fetch(_url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.length);
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
        // console.log(this.refs.myhome);
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
                        <img src="/images/hidebergoffer.png" className="img_logo" alt="hidebergoffer" />
                        {/* <Link to={} target="_blank" key={"a_" + i}> */}
                            <img src={`/images/website/${data[i].website_label}.png`} alt={data[i].website_label} className="img_job" />
                        {/* </Link> */}
                        {/* <span className="span_jobtitle">{data[i].website_label}</span> */}
                        <span className="span_jobsummary">{data[i].annonce_description}</span>
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
            <div className={"div-home-HBannonces " + classAnnonce} ref="myhome">
                <article id='home'>{_listContent}</article>
                <nav id='pagination'>{_listPagination}</nav>
            </div>
        )
    }
}
export default HBannonces;