import React from 'react';

const RelatedNumbers = (props) => {
    return (
        <React.Fragment>
        <h3 className="pt-3 pb-2">Related {props.name}</h3>
        <table className="table table-sm table-striped table-hover numbers-table">
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Frequency</th>
                </tr>
            </thead>
            <tbody>
                {props.numbers.map((number) => {
                    return (
                        <tr key={`${props.numberType}numberstab-row-content-${number.name}`}>
                            <th>{number.name}</th>
                            <td>{number.hitCount}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </React.Fragment>
    )
};

export default RelatedNumbers;
