const { useState } = React;
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

const Timer = ({ label, time_left }) => {
    return (
        <div className="timer--div">
            <div className="timer">
                <h3 id="timer-label">{label}</h3>
                <h2 id="time-left">{time_left}</h2>
            </div>
            <div className="start--reset">
                <button 
                    id="start_stop"
                    className="material-symbols-outlined start-stop btn" >play_pause</button>
                <button
                    id="reset"
                    className="material-symbols-outlined start-stop btn" >refresh</button>
            </div>
        </div>
    )
};

const App = () => {

    const [selectorsData, setSelectorsData] = useState({
        session: 25,
        break: 5
    });

    const handleArrowClick = (e) => {
        console.log(e.target.id)
        const id = e.target.id;
        switch (id) {
            case "session-increment":
                return setSelectorsData(s => {
                    const newSession = s.session <= 59 ? s.session + 1 : 60;
                    return {
                        ...s,
                        session: newSession,
                    }
                });
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

    return (
        <React.Fragment>
            <h1 id="title">25 + 5 Clock</h1>
            <div className="selectors--div">
                <Selectors 
                    id="break" 
                    label="Break Length" 
                    selected={selectorsData.break}
                    onArrowClick={handleArrowClick}
                />
                <Selectors 
                    id="session" 
                    label="Session Length" 
                    selected={selectorsData.session}
                    onArrowClick={handleArrowClick}
                />
            </div>
            <Timer label="session" time_left={"25:00"} />
        </React.Fragment>
    )
};

//render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>)