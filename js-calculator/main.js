const { createRoot } = ReactDOM;
const { useState } = React;

const Calculator = ({ onNumOprCLick, onAcClick, display }) => {
    return (
        <div id="calculator">
            <div id="display">{display}</div>
            <div className="btn" id="clear" onClick={onAcClick}>AC</div>
            <div id="main">
                <div id="numbers">
                    <div className="number btn" onClick={onNumOprCLick} id="one">1</div>
                    <div className="number btn" onClick={onNumOprCLick} id="two">2</div>
                    <div className="number btn" onClick={onNumOprCLick} id="three">3</div>
                    <div className="number btn" onClick={onNumOprCLick} id="four">4</div>
                    <div className="number btn" onClick={onNumOprCLick} id="five">5</div>
                    <div className="number btn" onClick={onNumOprCLick} id="six">6</div>
                    <div className="number btn" onClick={onNumOprCLick} id="seven">7</div>
                    <div className="number btn" onClick={onNumOprCLick} id="eigth">8</div>
                    <div className="number btn" onClick={onNumOprCLick} id="nine">9</div>
                    <div className="number btn" onClick={onNumOprCLick} id="zeroZero">00</div>
                    <div className="number btn" onClick={onNumOprCLick} id="zero">0</div>
                    <div className="number btn" onClick={onNumOprCLick} id="decimal">.</div>
                </div>
                <div id="operators">
                    <div className="operator btn" onClick={onNumOprCLick} id="add">+</div>
                    <div className="operator btn" onClick={onNumOprCLick} id="subtract">-</div>
                    <div className="operator btn" onClick={onNumOprCLick} id="divide">/</div>
                    <div className="operator btn" onClick={onNumOprCLick} id="multiply">x</div>
                </div>
            </div>
            <div className="btn" id="equals">=</div>
        </div>
    )
};

const App = () => {

    const [display, setDisplay] = useState([]);

    const handleCLick = (e) => {
        const value = e.target.childNodes[0].data;
        setDisplay((d) => [...d, value]);
    };

    const handleAcClick = () => {
        setDisplay([])
    };

    console.log(display)

    return (
        <Calculator
            onNumOprCLick={handleCLick}
            onAcClick={handleAcClick}
            display={display.join(" ")}
        />
    )
};

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);