import React from 'react';
import StatementDescription from './StatementDescription';
import StatementSampleInput from './StatementSampleInput';
import StatementSampleOutput from './StatementSampleOutput';
import './Statement.css';

export default function Statement(props) {
    const { question } = props;

    return (
        <>
            <div className="statement-container">
                <div className="pane-title">
                    ({question.id}) {question.title}
                </div>
                <div className="statement-body">
                    {question.description ? (
                        <StatementDescription props={question.description} />
                    ) : null}
                    {question.sampleInputs ? (
                        <StatementSampleInput props={question.sampleInputs} />
                    ) : null}
                    {question.sampleOutputs ? (
                        <StatementSampleOutput props={question.sampleOutputs} />
                    ) : null}
                </div>
            </div>
        </>
    );
}
