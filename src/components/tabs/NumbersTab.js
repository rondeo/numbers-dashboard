import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchNumbers, numbersIsLoading, setSortOrder, setLayout } from "../../modules/numbers/actions";
import Numberball from '../Numberball';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import types from "../../modules/numbers/types";
import { withRouter } from 'react-router';
import Refresh from '../Refresh';

class NumbersTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortLinks: [
        {
          name: 'number',
          display: 'Number'
        },
        {
          name: 'freq',
          display: 'Frequency'
        },
        {
          name: 'lastDrawn',
          display: 'Last Drawn'
        }
      ]
    };
  }

  componentDidMount() {
    if(this.props.numbers.length === 0) {
      this.props.setIsLoading(true, this.props.numberType);
    }
  }

  getData(column, direction) {
    this.props.fetchData(this.props.numberType, column, direction);
  }

  handleClick(e, column) {
    let direction = "DESC";
    if(this.props.column === column && this.props.direction === "DESC") {
      direction = "ASC";
    }
    this.props.sortOrder(this.props.numberType, column, direction);
    this.props.setIsLoading(true, this.props.numberType);
    e.preventDefault();
  }

  handleRowClick(number) {
    this.props.history.push(`/number/${number.numberType}/${number.name}`, number);
  }

  refreshContent() {
    this.props.setIsLoading(true, this.props.numberType);
  }

  handleLayout(layout) {
    this.props.setLayout(this.props.numberType, layout);
  }

  getSortIcon(link) {
    let sortCss = "angle-up";
    if(this.props.direction === 'DESC') {
      sortCss = "angle-down";
    } 
    return (<FontAwesomeIcon icon={`${sortCss}`} size="1x" className="ml-1"/>);
  }

  getSortLinks() {
    return this.state.sortLinks.map((link, index, arr) => {
      if(link.name === this.props.column) {
        return (
          <span key={`${this.props.numberType}-sortLink-${index}`} className="align-middle">
            <a href="#sort" className="badge badge-secondary pr-1" onClick={(e) => this.handleClick(e, link.name)}>
              {link.display}
              {this.getSortIcon(link)} 
            </a>            
            {index < arr.length - 1 ? " | " : ""}
          </span>
        );
      } else {
        return (
          <span key={`${this.props.numberType}-sortLink-${index}`} className="align-middle">
            <a href="#sort" className="text-secondary" onClick={(e) => this.handleClick(e, link.name)}>
              {link.display}
            </a>
            {index < arr.length - 1 ? " | " : ""}
          </span>
        );
      }      
    });
  }

  getNumbers() {
    return this.props.numbers.map((number) => {
      return (
        <Numberball number={number} key={`${this.props.numberType}_number_${number.name}`}/>
      );
    });
  }

  getBody() {
    if(this.props.hasErrored) {
      return (
        <CSSTransition key={`${this.props.numberType}numberstab-error`} timeout={300} classNames="numbers">
          <section className="numbers-section">
            <p>Ooops, sorry! There was an error loading the drawings</p>
          </section>
        </CSSTransition>
      );
    } 
    
    if(this.props.isLoading) {
      return (
        <CSSTransition 
          key={`${this.props.numberType}numberstab-loader`} 
          timeout={{enter: 300, exit: 300}} 
          classNames="numbers"
          onEntered={() => {
            this.getData(this.props.column, this.props.direction);
          }}
        >
          <section className="numbers-section">
            <div className="container-fluid text-center d-100 h-100">
              <div className="loader"></div>
              Loading {this.props.title} Numbers...
            </div>
          </section>
        </CSSTransition>
      );
    } 
    
    if(!this.props.isLoading && this.props.layout === types.LAYOUT_GRID && this.props.numbers.length > 0) {
      const key = `${this.props.numberType}numberstab-grid-content-${this.props.column}-${this.props.direction}`;
      return (
        <CSSTransition key={key} timeout={{enter: 300, exit: 300}} classNames="numbers">
          <section className="numbers-section">
            <div className="container-fluid" style={{paddingRight: "0px", paddingLeft: "0px"}}>
              <div className="row">
                {this.getNumbers()}
              </div>
            </div>
          </section>
        </CSSTransition>
      );
    }

    if(!this.props.isLoading && this.props.layout === types.LAYOUT_TABLE && this.props.numbers.length > 0) {
      const key = `${this.props.numberType}numberstab-table-content-${this.props.column}-${this.props.direction}`;
      return (
        <CSSTransition key={key} timeout={{enter: 300, exit: 300}} classNames="numbers">
          <section className="numbers-section">
            <div className="container-fluid" style={{paddingRight: "0px", paddingLeft: "0px"}}>
              
            <table className="table table-sm table-striped table-hover numbers-table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Frequency</th>
                  <th>Last Drawn</th>
                </tr>
              </thead>
              <tbody>

                {this.props.numbers.map((number) => {
                  return (
                    <tr key={`${this.props.numberType}numberstab-row-content-${number.name}`}
                      onClick={() => this.handleRowClick(number)}
                    >
                      <th>{number.name}</th>
                      <td>{number.hitCount}</td>
                      <td>{number.lastDrawDate}</td>
                    </tr>
                  );
                })}
   
              </tbody>
            </table>

            </div>
          </section>
        </CSSTransition>
      );
    }

    return "";
  }

  getLayoutIcons() {
    let gridCss = "ml-1 mr-2 align-middle " + (this.props.layout === types.LAYOUT_GRID ? "text-primary" : "text-muted");
    let tableCss = "align-middle " + (this.props.layout === types.LAYOUT_TABLE ? "text-primary" : "text-muted");
    const cssStyle = {
      cursor: "pointer"
    };
    return (
      <React.Fragment>
        <FontAwesomeIcon className={gridCss} style={cssStyle} icon="th" size="lg" onClick={() => this.handleLayout(types.LAYOUT_GRID)}/>
        <FontAwesomeIcon className={tableCss} style={cssStyle} icon="table" size="lg" onClick={() => this.handleLayout(types.LAYOUT_TABLE)}/>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="tab-pane active" id={`${this.props.numberType}numbers`}>
        <h3>
          {this.props.title} Numbers
          <Refresh onClick={() => this.refreshContent()} />
        </h3>
        <hr/>
        <div className="pb-3 clearfix">
          {this.getLayoutIcons()}
          <div className="float-right">
            <span className="mr-1 align-middle font-weight-light text-muted">Sort By:</span>
            {this.getSortLinks()}                  
          </div>
        </div>
        <TransitionGroup className="transition-group">
          {this.getBody()}
        </TransitionGroup>
      </div>
    );
  }

}

const mapStateToProps = ({ numbers }, ownProps) => {
  return {
    numbers: numbers[ownProps.numberType].numbers,
    column: numbers[ownProps.numberType].column,
    direction: numbers[ownProps.numberType].direction,
    hasErrored: numbers[ownProps.numberType].hasErrored,
    isLoading: numbers[ownProps.numberType].isLoading,
    layout: numbers[ownProps.numberType].layout
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (numberType, column, direction) => dispatch(fetchNumbers(numberType, column, direction)),
    setIsLoading: (bool, numberType) => dispatch(numbersIsLoading(bool, numberType)),
    sortOrder: (numberType, column, direction) => dispatch(setSortOrder(numberType, column, direction)),
    setLayout: (numberType, layout) => dispatch(setLayout(numberType, layout))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NumbersTab));