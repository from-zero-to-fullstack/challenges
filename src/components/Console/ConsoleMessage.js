import React from 'react';
import './ConsoleMessage.css';

export default function ConsoleMessage(props) {
    return <div className="message">{props.props}</div>;
}
