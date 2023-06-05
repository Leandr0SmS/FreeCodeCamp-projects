const { createRoot } = ReactDOM;

const Selectors = ({ id, label, selected }) => {
    return (
        <div className="selectors">
            <h1 id={id}>{label}</h1>
            <div className="controls--div">
                <div className="controls">
                    <span className="material-symbols-outlined arrow">expand_less</span>
                    <span className="material-symbols-outlined arrow">expand_more</span>
                </div>
                <h2 className="number">{selected}</h2>
            </div>
        </div>
    )
};

const Timer = ({ number }) => {
    return (
        <div className="timer--div">
            <div className="timer">{number}</div>
            <span className="material-symbols-outlined" id="play_pause">play_pause</span>
            <span className="material-symbols-outlined">refresh</span>
        </div>
    )
};

const App = () => {
    return (
        <React.Fragment>
            <Selectors id="break-label" label="Break Length" selected={5}/>
            <Selectors id="session-label" label="Session Length" selected={25}/>
        </React.Fragment>
    )
};

//render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>)