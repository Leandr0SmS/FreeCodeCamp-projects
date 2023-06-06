import { counter } from "./functions/functions.js";
const { useState, useEffect } = React;
const { createRoot } = ReactDOM;

const Selectors = ({ id, label, selected, onArrowClick }) => {
    return (
        <div className="selectors">
            <h3 id={`${id}-label`}>{label}</h3>
            <div className="controls--div">
                <div className="controls">
                    <button 
                        id={`${id}-increment`} 
                        className="material-symbols-outlined arrow btn"
                        onClick={onArrowClick}
                    >expand_less</button>
                    <button 
                        id={`${id}-decrement`}
                        className="material-symbols-outlined arrow btn"
                        onClick={onArrowClick}
                    >expand_more</button>
                </div>
                <h2 
                    id={`${id}-length`}
                    className="number">
                        {selected}
                </h2>
            </div>
        </div>
    )
};

const Timer = ({ label, min_left, sec_left, onStartStopClick, onResetClick }) => {

    return (
        <div className="timer--div">
            <div className="timer">
                <h3 id="timer-label">{label}</h3>
                <h2 id="time-left">
                    {min_left < 10 ? `0${min_left}` : min_left}
                    :
                    {sec_left < 10 ? `0${sec_left}` : sec_left}
                </h2>
            </div>
            <div className="start--reset">
                <button 
                    id="start_stop"
                    onClick={onStartStopClick}
                    className="material-symbols-outlined start-stop btn" >play_pause</button>
                <button
                    id="reset"
                    onClick={onResetClick}
                    className="material-symbols-outlined start-stop btn" >refresh</button>
            </div>
        </div>
    )
};

const App = () => {

    const [startOn, setStartOn] = useState(false);
    const [selectorsData, setSelectorsData] = useState({
        session: 25,
        break: 5
    });
    const [timeLeft, setTimeLeft] = useState([]);

    useEffect(() => {
        setTimeLeft([selectorsData.session, 0])
    },[selectorsData]);

    const handleArrowClick = (e) => {
        const id = e.target.id;
        switch (id) {
            case "session-increment":
                setSelectorsData(s => {
                    const newSession = s.session <= 59 ? s.session + 1 : 60;
                    return {
                        ...s,
                        session: newSession,
                    }
                });
                setTimeLeft([selectorsData.session, 0])
                break;
            case "session-decrement":
                return setSelectorsData(s => {
                    const newSession = s.session >= 1 ? s.session - 1 : 0;
                    return {
                        ...s,
                        session: newSession,
                    }
                });
            case "break-increment":
                return setSelectorsData(s => {
                    const newBreak = s.break <= 59 ? s.break + 1 : 60;
                    return {
                        ...s,
                        break: newBreak,
                    }
                });
            case "break-decrement":
                return setSelectorsData(s => {
                    const newBreak = s.break >= 1 ? s.break - 1 : 0;
                    return {
                        ...s,
                        break: newBreak,
                    }
                });
            default:
                console.log("Not a valid button id")
                break;
        }
    };

    const handleStartStopClick = () => {
        setStartOn(s => !s);
    };

    const handleResetClick = () => {
        setTimeLeft([selectorsData.session, 0]);
        setStartOn(false);
    };

    useEffect(() => {
        let nIntervId;
        if (startOn && !nIntervId) {
            nIntervId = setInterval(() => {
                console.log(`${nIntervId} on`);
                setTimeLeft(counter(timeLeft[0], timeLeft[1]));
            }, 1000);
            if (timeLeft.every(num => num == 0)) {
                clearInterval(nIntervId);
                nIntervId = null;
                setStartOn(false);
            }
        } else if (!startOn) {
            console.log(`${nIntervId} stop`)
            clearInterval(nIntervId);
            nIntervId = null;
        }
        return () => clearInterval(nIntervId);

    },[startOn, timeLeft]);

    console.log(timeLeft)
    console.log(timeLeft.every(num => num == 0))

    return (
        <React.Fragment>
            <h1 id="title">25 + 5 Clock</h1>
            <div className="selectors--div">
                <Selectors 
                    id="break" 
                    label="Break Length" 
                    selected={selectorsData.break}
                    onArrowClick={startOn ? undefined : handleArrowClick}
                />
                <Selectors 
                    id="session" 
                    label="Session Length" 
                    selected={selectorsData.session}
                    onArrowClick={startOn ? undefined : handleArrowClick}
                />
            </div>
            <Timer 
                label="session" 
                min_left={timeLeft[0]}
                sec_left={timeLeft[1]}
                onStartStopClick={handleStartStopClick}
                onResetClick={handleResetClick}
            />
        </React.Fragment>
    )
};

//render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>)