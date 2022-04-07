import React from 'react';
import './TerminalMessage.css';

export default function TerminalMessage(props) {
    return (
        <>
            <div className="message">{props.props}</div>
        </>
    );
}
