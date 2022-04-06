import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import StatementDescription from './StatementDescription';
import StatementSampleInput from './StatementSampleInput';
import StatementSampleOutput from './StatementSampleOutput';

export default function Statement(props) {
    const { title, description, sampleInput, sampleOutput } = props;

    console.log('title', title);
    console.log('description', description);
    console.log('sampleInput', sampleInput);
    console.log('sampleOutput', sampleOutput);

    const [open, setOpen] = useState(true);

    return (
        <div className={`statement-container ${open ? '' : 'collapsed'}`}>
            <div className="statement-title">
                {title}
                <button
                    type="button"
                    className="expand-collapse-button"
                    onClick={() => setOpen(prevOpen => !prevOpen)}
                >
                    <FontAwesomeIcon
                        icon={open ? faCompressAlt : faExpandAlt}
                    />
                </button>
            </div>
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
    );
}
