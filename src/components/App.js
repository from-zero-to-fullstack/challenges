import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Statement from './Statement/Statement';
import Editor from './Editor/Editor';
import Terminal from './Terminal/Terminal';

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

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

    const [overflow, setOverflow] = useState('auto');
    const [position, setPosition] = useState('auto');

    const questions = codeExercises.javascript.map((data) => {
        return data;
    });

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

    let consoleOutput = '';

    const submitCode = () => {
        const submittedAnswer = getSubmittedAnswer();
        const correctAnswer = questions[level].sampleOutputs;

        let consoleMessage = '';

        if (correctAnswer.includes(submittedAnswer)) {
            const { msg } = handleCorrectAnswer();
            consoleMessage = msg;
        } else {
            const { msg } = handleIncorrectAnswer();
            consoleMessage = msg;
        }

        setTerminal({
            message: consoleMessage,
            output: consoleOutput,
            isError: consoleOutput === '' ? false : true,
        });
    };

    function getSubmittedAnswer() {
        try {
            if (code === '') {
                throw new Error("You didn't wrote any code...");
            }

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
            consoleOutput = e.message;
        }
    }

    function handleCorrectAnswer() {
        hideSubmitButton();
        showNextLevelButton();

        return {
            msg: '✅ Well done',
        };
    }

    function handleIncorrectAnswer() {
        return {
            msg: '❌ Wrong answer... try again',
        };
    }

    function showSubmitButton() {
        const button = document.getElementById('btn-submit-code');
        button.style.display = 'block';
    }

    function hideSubmitButton() {
        const button = document.getElementById('btn-submit-code');
        button.style.display = 'none';
    }

    function showNextLevelButton() {
        const button = document.getElementById('btn-next-level');
        button.style.display = 'block';
    }

    function hideNextLevelButton() {
        const button = document.getElementById('btn-next-level');
        button.style.display = 'none';
    }

    const goToNextLevel = () => {
        hideNextLevelButton();
        showSubmitButton();

        clearWorkspace();

        setLevel(level + 1);
    };

    const goToLevel = (levelToRedirect) => {
        if (level != levelToRedirect) {
            setLevel(levelToRedirect);
            clearWorkspace();
        }
    };

    function clearWorkspace() {
        setCode('');
        setTerminal('');
    }

    return (
        <>
            <div className="container">
                <div className="header">
                    <Menu
                        menuButton={
                            <MenuButton className="button menu-button">
                                ▼ Levels
                            </MenuButton>
                        }
                        overflow={overflow}
                        position={position}
                    >
                        <div className="menu-container">
                            {questions.map((_, i) => (
                                <MenuItem
                                    key={i}
                                    className="menu-item"
                                    onClick={(e) => goToLevel(i)}
                                >
                                    # {i + 1} {_.title}
                                </MenuItem>
                            ))}
                        </div>
                    </Menu>
                    <h2 className="header-title">
                        <span>console.log(</span>
                        'From Zero to FullStack'
                        <span>);</span>
                    </h2>
                </div>
                <div className="body">
                    <div id="resizable" className="left-pane resizable">
                        <Statement question={questions[level]} />
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
                <div className="footer">
                    <button
                        id="btn-submit-code"
                        type="button"
                        className="button btn-submit-code"
                        onClick={submitCode}
                    >
                        Submit
                    </button>
                    <button
                        id="btn-next-level"
                        type="button"
                        className="button btn-next-level"
                        onClick={goToNextLevel}
                    >
                        Go to next question
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
