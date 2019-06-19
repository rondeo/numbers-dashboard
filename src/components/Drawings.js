import React, { Component } from 'react';
import { connect } from "react-redux";
import Drawing from './Drawing';
import { fetchDrawings } from "../modules/drawings/actions";

class Drawings extends Component {

    componentDidMount() {    
        let page = parseInt(this.props.match.params.page, 10);
        let pageSize = parseInt(this.props.match.params.pageSize, 10);
        if(this.props.drawings.length === 0 || page !== this.props.page || pageSize !== this.props.pageSize) {
            this.getNextDrawings(pageSize, page);
        }
    }
    
    getNextDrawings(size, page) {
        this.props.fetchData(size, page);
    }

    getDrawingsBody() {
    if (this.props.hasErrored) {
    return (<p>Ooops, sorry! There was an error loading the drawings</p>);
    }

    if (this.props.isLoading) {
    return (<p>Loading…</p>);
    }

    return (
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
    );
    }

    render() {
        return (
            <div className="tab-pane" id="drawings">
                {this.getDrawingsBody()}
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
        isLoading: drawings.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (page, size) => dispatch(fetchDrawings(page, size))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawings);
