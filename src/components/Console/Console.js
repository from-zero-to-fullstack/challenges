import React from 'react';
import ConsoleMessage from './ConsoleMessage';
import ConsoleOutput from './ConsoleOutput';
import './Console.css';

export default function Console(props) {
    const { message, output } = props;

    return (
        <>
            <div className="console-container">
                <div className="title">Console</div>
                <div className="console-body">
                    {message ? <ConsoleMessage props={message} /> : null}
                    {output ? <ConsoleOutput props={output} /> : null}
                </div>
            </div>
        </>
    );
}
