const { createRoot } = ReactDOM;

const Selectors = ({ id, label, selected }) => {
    return (
        <div className="selectors">
            <h3 id={`${id}-label`}>{label}</h3>
            <div className="controls--div">
                <div className="controls">
                    <span 
                        id={`${id}-increment`} 
                        className="material-symbols-outlined arrow">expand_less</span>
                    <span 
                        id={`${id}-decrement`}
                        className="material-symbols-outlined arrow">expand_more</span>
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
                <span 
                    id="start_stop"
                    className="material-symbols-outlined start-stop" >play_pause</span>
                <span
                     id="reset"
                    className="material-symbols-outlined start-stop" >refresh</span>
            </div>
        </div>
    )
};

const App = () => {
    return (
        <React.Fragment>
            <h1 id="title">25 + 5 Clock</h1>
            <div className="selectors--div">
                <Selectors id="break" label="Break Length" selected={5}/>
                <Selectors id="session" label="Session Length" selected={25}/>
            </div>
            <Timer label="session" time_left={"25:00"} />
        </React.Fragment>
    )
};

//render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>)