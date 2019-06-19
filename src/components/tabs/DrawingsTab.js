import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchDrawings, drawingsIsLoading, setLayout } from "../../modules/drawings/actions";
import Drawing from '../Drawing';
import Refresh from '../Refresh';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import types from "../../modules/drawings/types";

class DrawingsTab extends Component {

  componentDidMount() {    
    let page = parseInt(this.props.match.params.page, 10);
    let pageSize = parseInt(this.props.match.params.pageSize, 10);
    if(this.props.drawings.length === 0 || page !== this.props.page || pageSize !== this.props.pageSize) {
      this.props.setIsLoading(true);
    }
  }

  handleClick(direction) {
    if(direction === "FIRST") {
      this.props.history.push(`/drawings/${this.props.pageSize}/0`);
    } else if(direction === "PREV") {
      this.props.history.push(`/drawings/${this.props.pageSize}/${this.props.page - 1}`);
    } else if(direction === "NEXT") {
      this.props.history.push(`/drawings/${this.props.pageSize}/${this.props.page + 1}`);
    } else if(direction === "LAST") {
      
    }
  }

  handleCellClick(number) {
    this.props.history.push(`/number/${number.numberType}/${number.name}`, number);
  }

  getNextDrawings() {
    let page = parseInt(this.props.match.params.page, 10);
    let pageSize = parseInt(this.props.match.params.pageSize, 10);
    this.props.fetchData(pageSize, page);
  }

  refreshContent() {
    this.getNextDrawings();
  }

  handleLayout(layout) {
    this.props.setLayout(layout);
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

  getDrawingsCount() {
    if(this.props.drawings.length > 0) {
      const start = this.props.page === 0 ? 1 : (this.props.page * this.props.pageSize) + 1;
      const endOf = this.props.count + start - 1;
      const style = {
        minWidth: "155px",
        paddingTop: "0px",
        paddingBottom: "0px",
        paddingLeft: "6px",
        paddingRight: "6px"
      };
      return (
        <span className="btn float-right2" style={style}>
          <span className="font-weight-light2 text-muted2">
            {start} - {endOf} of {this.props.totalDrawings}
          </span>
        </span>
      );
    }
    return "";
  }

  getDrawingsBody() {
    if (this.props.hasErrored) {
      return (
        <CSSTransition key={"drawingstab-error"} timeout={300} classNames="numbers">
          <p>Ooops, sorry! There was an error loading the drawings</p>
        </CSSTransition>
      );
    }

    if (this.props.isLoading) {
      return (
        <CSSTransition 
          key={"drawingstab-loader"} 
          timeout={{enter: 300, exit: 300}} 
          classNames="numbers"
          onEntered={() => {
            this.getNextDrawings();
          }}
        >
          <section className="drawings-section">
            <div className="container-fluid text-center d-100 h-100">
              <div className="loader"></div>
              Loading Drawings...
            </div>
          </section>
        </CSSTransition>
      );
    }

    if(!this.props.isLoading && this.props.layout === types.LAYOUT_TABLE) {
      const key = `${this.props.numberType}numberstab-table-content-${this.props.column}-${this.props.direction}`;
      return (
        <CSSTransition key={key} timeout={{enter: 300, exit: 300}} classNames="numbers">
          <section className="drawings-section">
            <div className="container-fluid" style={{paddingRight: "0px", paddingLeft: "0px"}}>
              
            <table className="table table-sm table-striped table-hover drawings-table">
              <thead>
                <tr className="text-center d-sm-table-row d-lg-none">
                  <th>WB 1</th>
                  <th>WB 2</th>
                  <th>WB 3</th>
                  <th>WB 4</th>
                  <th>WB 5</th>
                  <th className="text-danger">PB</th>
                </tr>
                <tr className="text-center d-none d-lg-table-row">
                  <th>Whiteball 1</th>
                  <th>Whiteball 2</th>
                  <th>Whiteball 3</th>
                  <th>Whiteball 4</th>
                  <th>Whiteball 5</th>
                  <th className="text-danger">Powereball</th>
                </tr>
              </thead>
              <tbody>

                {this.props.drawings.map((drawing, index) => {
                  return (                    
                    <tr className="drawing-row text-center" key={`drawingstab-row-content-${index}`}>
                      <td onClick={() => this.handleCellClick(drawing.whiteball_1)}>
                        <span className={drawing.whiteball_1.name > 9 ? "double" : "single"}>{drawing.whiteball_1.name}</span>
                      </td>
                      <td onClick={() => this.handleCellClick(drawing.whiteball_2)}>
                        <span className={drawing.whiteball_2.name > 9 ? "double" : "single"}>{drawing.whiteball_2.name}</span>
                      </td>
                      <td onClick={() => this.handleCellClick(drawing.whiteball_3)}>
                        <span className={drawing.whiteball_3.name > 9 ? "double" : "single"}>{drawing.whiteball_3.name}</span>
                      </td>
                      <td onClick={() => this.handleCellClick(drawing.whiteball_4)}>
                        <span className={drawing.whiteball_4.name > 9 ? "double" : "single"}>{drawing.whiteball_4.name}</span>
                      </td>
                      <td onClick={() => this.handleCellClick(drawing.whiteball_5)}>
                        <span className={drawing.whiteball_5.name > 9 ? "double" : "single"}>{drawing.whiteball_5.name}</span>
                      </td>
                      <td onClick={() => this.handleCellClick(drawing.powerball)} className="text-danger">
                        <span className={drawing.powerball.name > 9 ? "double" : "single"}>{drawing.powerball.name}</span>
                      </td>
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

    return (
      <CSSTransition key={`drawingstab-drawings-${this.props.page}`} timeout={{enter: 300, exit: 300}} classNames="numbers">
        <section className="drawings-section">
          <div className="container-fluid" style={{paddingRight: "0px", paddingLeft: "0px"}}>
            <div className="row">
              {
                this.props.drawings.map((drawing, index) => {
                  return (
                    <Drawing drawing={drawing} key={`drawing_${index}`} />
                  );
                })
              }
            </div>
          </div>
        </section>
      </CSSTransition>
    );
  }

  getPagination() {
    if(!this.props.hasErrored) {
      const IconStyling = {marginBottom: "1px"};
      const btnClass = "btn btn-link text-secondary";
      const btnLeftStyle = {
        paddingRight: "0px",
        paddingBottom: "0px",
        paddingTop: "0px"
      };
      const btnRightStyle = {
        paddingLeft: "0px",
        paddingBottom: "0px",
        paddingTop: "0px"
      };
      const spanClass = "d-none d-lg-inline";

      return (
        <div style={{paddingBottom: "0px"}}>
          <button type="button" className={btnClass} style={{...btnLeftStyle, paddingLeft: "0px"}} disabled={this.props.page === 0} onClick={() => this.handleClick("FIRST")}>
            <FontAwesomeIcon icon="angle-double-left" size="xs" className="mr-1" style={IconStyling}/><span className={spanClass}>First</span>
          </button>
          <button type="button" className={btnClass} style={{...btnLeftStyle, paddingLeft: "6px"}} disabled={this.props.page === 0} onClick={() => this.handleClick("PREV")}>
            <FontAwesomeIcon icon="angle-left" size="xs" className="mr-1" style={IconStyling}/><span className={spanClass}>Prev</span>
          </button>
          {this.getDrawingsCount()}
          <button type="button" className={btnClass} style={{...btnRightStyle, paddingRight: "6px"}} onClick={() => this.handleClick("NEXT")}>
            <span className={spanClass}>Next</span><FontAwesomeIcon icon="angle-right" size="xs" className="ml-1" style={IconStyling}/>
          </button>
          <button type="button" className={btnClass} style={{...btnRightStyle, paddingRight: "0px"}} onClick={() => this.handleClick("LAST")}>
            <span className={spanClass}>Last</span><FontAwesomeIcon icon="angle-double-right" size="xs" className="ml-1" style={IconStyling}/>
          </button>
        </div>
      );
    }
    return "";
  }

  render() {
    return (
      <div className="tab-pane active" id="drawings">
        <h3>
          Drawings
          <Refresh onClick={() => this.refreshContent()} />
        </h3>
        <hr/>
        <div className="pb-3 clearfix">
          {this.getLayoutIcons()}
          <div className="float-right">
          {this.getPagination()}              
          </div>
        </div>
        <TransitionGroup className="transition-group">
          {this.getDrawingsBody()}
        </TransitionGroup>
      </div>
    );
  }

}

const mapStateToProps = ({ drawings }) => {
  return {
    drawings: drawings.items,
    count: drawings.count,
    page: drawings.page,
    pageSize: drawings.pageSize,
    totalDrawings: drawings.totalDrawings,
    hasErrored: drawings.hasErrored,
    isLoading: drawings.isLoading,
    layout: drawings.layout
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (page, size) => dispatch(fetchDrawings(page, size)),
    setIsLoading: (bool) => dispatch(drawingsIsLoading(bool)),
    setLayout: (layout) => dispatch(setLayout(layout))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawingsTab));
