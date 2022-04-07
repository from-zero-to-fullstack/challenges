import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Statement from './Statement/Statement';
import Editor from './Editor/Editor';
import Terminal from './Terminal/Terminal';
import './App.css';

import codeExercises from './exercises/code-exercises.json';

function App() {
    // const [level, setLevel] = useLocalStorage('level', 0);
    const [level, setLevel] = useState(0);
    // const [statement, setStatement] = useLocalStorage('statement', '');
    const [code, setCode] = useLocalStorage('code', '');
    const [terminal, setTerminal] = useState('');
    const [initialPosition, setInitialPosition] = useState(null);
    const [initialSize, setInitialSize] = useState(null);

    const questions = codeExercises.javascript.map(data => {
        return data;
    });

    let output = '';

    function initial(e) {
        let resizable = document.getElementById('resizable');

        setInitialPosition(e.clientX);
        setInitialSize(resizable.offsetWidth);
    }

    function resize(e) {
        let resizable = document.getElementById('resizable');

        resizable.style.width = `${
            parseInt(initialSize) + parseInt(e.clientX - initialPosition)
        }px`;
    }

    const submitCode = () => {
        const submittedAnswer = getSubmittedAnswer();
        const correctAnswer = questions[level].sampleOutput;

        let msg = '';

        if (submittedAnswer === correctAnswer) {
            msg = '✅ Well done';

            // setLevel(level + 1);
        } else {
            msg = '❌ Wrong answer... try again';
        }

        setTerminal({
            message: msg,
            output: output,
            isError: output === '' ? false : true,
        });
    };

    function getSubmittedAnswer() {
        try {
            let sanitizedCode = code.replace(
                /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$|(<script>)|eval|XMLHttpRequest|document\.write/gm,
                ''
            );

            console.oldLog = console.log;
            console.log = function (code) {
                console.oldLog(code);
                return code;
            };

            const script = eval(sanitizedCode);

            return script;
        } catch (e) {
            output = e.message;
        }
    }

    return (
        <>
            <div className="pane">
                <div id="resizable" className="left-pane resizable">
                    <Statement
                        title={questions[level].title}
                        description={questions[level].description}
                        sampleInput={questions[level].sampleInput}
                        sampleOutput={questions[level].sampleOutput}
                    />
                    <Terminal
                        message={terminal.message}
                        output={terminal.output}
                        isError={terminal.isError}
                    />
                </div>
                <div
                    className="draggable"
                    draggable="true"
                    onDragStart={initial}
                    onDrag={resize}
                />
                <div className="right-pane">
                    <Editor
                        language="javascript"
                        displayName="JavaScript"
                        value={code}
                        onChange={setCode}
                    />
                </div>
            </div>
            <button type="button" className="submit-code" onClick={submitCode}>
                Submit
            </button>
        </>
    );
}

export default App;
