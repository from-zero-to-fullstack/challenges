import React from 'react';
import './StatementSample.css';

export default function StatementSampleInput(props) {
    return (
        <>
            <div>
                <div className="statement-title">Sample Inputs:</div>
                {props.props.map((_, i) => (
                    <div key={i}>- {_}</div>
                ))}
            </div>
        </>
    );
}
