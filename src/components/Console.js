import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import ConsoleMessage from './ConsoleMessage';
import ConsoleOutput from './ConsoleOutput';

export default function Console(props) {

    const { message, output } = props;

    const [open, setOpen] = useState(true);

    return (
        <div className={`console-container ${open ? '' : 'collapsed'}`}>
            <div className="console-title">
                {Console}
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
            <div className='console-body'>
                { message ? <ConsoleMessage props={message} /> : null }
                { output ? <ConsoleOutput props={output} /> : null }
            </div>
        </div>
    );
}