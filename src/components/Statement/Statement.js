import React from 'react';
import StatementDescription from './StatementDescription';
import StatementSampleInput from './StatementSampleInput';
import StatementSampleOutput from './StatementSampleOutput';
import './Statement.css';

export default function Statement(props) {
    const { title, description, sampleInput, sampleOutput } = props;

    return (
        <>
            <div className="statement-container">
                <div className="pane-title">{title}</div>
                <div className="statement-body">
                    {description ? (
                        <StatementDescription props={description} />
                    ) : null}
                    {sampleInput ? (
                        <StatementSampleInput props={sampleInput} />
                    ) : null}
                    {sampleOutput ? (
                        <StatementSampleOutput props={sampleOutput} />
                    ) : null}
                </div>
            </div>
        </>
    );
}
