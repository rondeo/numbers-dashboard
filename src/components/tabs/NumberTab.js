import 'rc-slider/assets/index.css';

import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchNumberProperties, numberPropsIsLoading, setSampleSize } from "../../modules/numberProperties/actions";
//import { TransitionGroup, CSSTransition } from "react-transition-group";
import DonutChart from '../charts/DonutChart';
import RelatedNumbers from '../RelatedNumbers';
import Refresh from '../Refresh';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

//const createSliderWithTooltip = Slider.createSliderWithTooltip;
//const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={<span style={{paddingLeft: "5px", paddingRight: "5px"}}>{value}</span>}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class NumberTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: this.props.sampleSize
    };
  }

  componentDidMount() {
    this.props.getNumberProperties(this.props.match.params.numberType, this.props.match.params.id, this.props.sampleSize);
  }

  refreshContent() {
    
  }

  onSliderChange(value) {
    //console.log("Slider Value Changed: ", value);
    //this.props.setSampleSizeValue(value);
    this.setState({size: value});
  }

  onAfterChange(value) {
    console.log("Slider Value Changed After: ", value);
    this.props.setSampleSizeValue(value);
    this.props.getNumberProperties(this.props.match.params.numberType, this.props.match.params.id, value);
  }

  getRelatedWhiteballs() {
    if(this.props.number.relatedWhiteballs.length > 0) {
      return (
        <div className="tab-pane fade show active" id="home" role="tabpanel">
          <RelatedNumbers name={"Whiteballs"} numbers={this.props.number.relatedWhiteballs} numberType={this.props.numberType} />
        </div>
      );
    }
    return "";
  }

  getRelatedPowerballs() {
    if(this.props.number.relatedPowerballs.length > 0) {
      return (
        <div className="tab-pane fade" id="profile" role="tabpanel">
          <RelatedNumbers name={"Powerballs"} numbers={this.props.number.relatedPowerballs} numberType={this.props.numberType} />
        </div>
      );
    }
    return "";
  }
    
  getBody() {

    if(this.props.hasErrored) {
      return (
          <section className="number-propertiess-section">
            <p>Ooops, sorry! There was an error loading the drawings</p>
          </section>
      );
    } 
    
    if(this.props.isLoading) {
      return (
          <section className="number-propertiess-section">
            <div className="container-fluid text-center d-100 h-100">
              <div className="loader"></div>
              Loading Number Propertiess...
            </div>
          </section>
      );
    } 

    if(!this.props.isLoading && this.props.number != null) {
      //let dec = (this.props.number.hitCount / this.props.drawingsCount) * 100;
      let dec = (this.props.lastCount / this.props.sampleSize) * 100;
      let percent = dec.toFixed(0);

      //<div>{percent}</div>
      //<div>{this.props.lastCount} of last {this.props.sampleSize}</div>

      return (
        <div>
          <DonutChart size="200" strokewidth="25" value={percent} />
          <div className="pt-3 pb-4 px-3 py-3">
          <Slider
            handle={handle}
            value={this.state.size}
            marks={{1:1, [this.props.drawingsCount]: this.props.drawingsCount}}
            min={1} max={this.props.drawingsCount} step={1} 
            onChange={(value) => this.onSliderChange(value)} 
            onAfterChange={(value) => this.onAfterChange(value)}
          />
          </div>

          <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">Whiteballs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab">Powerballs</a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              {this.getRelatedWhiteballs()}
              {this.getRelatedPowerballs()}
            </div>

          </div>
        </div>
      );
    }

    return "";
    
  }

  render() {
    return (
      <div className="tab-pane active" id={`${this.props.match.params.numberType}number-props`}>
        <h3>
          {this.props.match.params.numberType} {this.props.match.params.id}
          <Refresh onClick={() => this.refreshContent()} />
        </h3>
        <hr/>
        {this.getBody()}
      </div>
    );
  }

}

const mapStateToProps = ({ numberProps }) => {
  return {
    number: numberProps.number,
    drawingsCount: numberProps.drawingsCount,
    lastCount: numberProps.lastCount,
    sampleSize: numberProps.sampleSize,
    isLoading: numberProps.isLoading,
    hasErrored: numberProps.hasErrored
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNumberProperties: (numberType, number, countSize) => dispatch(fetchNumberProperties(numberType, number, countSize)),
    setIsLoading: (bool) => dispatch(numberPropsIsLoading(bool)),
    setSampleSizeValue: (size) => dispatch(setSampleSize(size))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberTab);
