import React, { useState, useEffect } from 'react';
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
    const [level, setLevel] = useLocalStorage('level', 0);
    const [maxLevel, setMaxLevel] = useLocalStorage('maxLevel', 0);
    const [code, setCode] = useLocalStorage('code', '');
    const [terminal, setTerminal] = useState('');
    const [initialPosition, setInitialPosition] = useState(null);
    const [initialSize, setInitialSize] = useState(null);
    const [overflow, setOverflow] = useState('auto');
    const [position, setPosition] = useState('auto');

    useEffect(() => {
        handleMaxLevel();
    }, [level]);

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
    let errorFlag = false;

    const submitCode = () => {
        const submittedAnswer = getSubmittedAnswer();

        const currentQuestion = questions[level];
        console.info('currentQuestion', currentQuestion);
        console.info(
            'currentQuestion.expectedPattern',
            currentQuestion.expectedPattern
        );

        const expectedPattern = new RegExp(currentQuestion.expectedPattern);

        console.info('expectedPattern', expectedPattern);

        let consoleMessage = '';

        if (submittedAnswer === '') {
            const { msg } = handleIncorrectAnswer();
            consoleMessage = msg;
        }

        if (
            currentQuestion.correctAnswer &&
            currentQuestion.correctAnswer === submittedAnswer
        ) {
            const { msg, isError } = handleCorrectAnswer();
            consoleMessage = msg;
            errorFlag = isError;
        } else if (
            currentQuestion.sampleOutputs &&
            currentQuestion.sampleOutputs.includes(submittedAnswer)
        ) {
            const { msg, isError } = handleCorrectAnswer();
            consoleMessage = msg;
            errorFlag = isError;
        } else if (expectedPattern && expectedPattern.exec(submittedAnswer)) {
            const { msg, isError } = handleCorrectAnswer();
            consoleMessage = msg;
            errorFlag = isError;
        } else {
            const { msg, isError } = handleIncorrectAnswer();
            consoleMessage = msg;
            errorFlag = isError;
        }

        setTerminal({
            message: consoleMessage,
            output: consoleOutput,
            isError: errorFlag,
            submitedCodeOutput: submittedAnswer,
        });
    };

    function getSubmittedAnswer() {
        try {
            if (code === '') {
                throw new Error(
                    "You need to write some code...don't be afraid 💪"
                );
            }

            let sanitizedCode = code.replace(
                /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$|(<script>)|eval|XMLHttpRequest|document\.write/gm,
                ''
            );

            overrideConsoleLog();

            return eval(sanitizedCode);
        } catch (e) {
            consoleOutput = e.message;
        }
    }

    function overrideConsoleLog() {
        console.oldLog = console.log;

        console.log = (code) => {
            console.oldLog(code);
            return code;
        };
    }

    function handleCorrectAnswer() {
        hideSubmitButton();
        showNextLevelButton();

        return {
            msg: '✅ Well done',
            isError: false,
        };
    }

    function handleIncorrectAnswer() {
        return {
            msg: '❌ Wrong answer... try again',
            isError: true,
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

    function handleMaxLevel() {
        if (level > maxLevel) {
            setMaxLevel(level);
        }
    }

    const goToLevel = (levelToRedirect) => {
        if (level !== levelToRedirect) {
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
                            {questions.map((_, i) => {
                                if (maxLevel >= _.level) {
                                    return (
                                        <MenuItem
                                            key={i}
                                            className={'menu-item'}
                                            onClick={(e) => goToLevel(i)}
                                        >
                                            # {i + 1} {_.title}
                                        </MenuItem>
                                    );
                                } else {
                                    return (
                                        <MenuItem
                                            key={i}
                                            disabled
                                            onClick={(e) => goToLevel(i)}
                                        >
                                            # {i + 1} {_.title}
                                        </MenuItem>
                                    );
                                }
                            })}
                        </div>
                    </Menu>
                    <h3 className="header-title">
                        <span>console.log(</span>
                        'From Zero to FullStack'
                        <span>);</span>
                    </h3>
                </div>
                <div className="body">
                    <div
                        id="resizable"
                        className="left-pane resizable"
                    >
                        <Statement question={questions[level]} />
                        <Terminal
                            message={terminal.message}
                            output={terminal.output}
                            isError={terminal.isError}
                            submitedCodeOutput={terminal.submitedCodeOutput}
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
