const { createRoot } = ReactDOM;
const { useState } = React;

const Calculator = ({ onNumOprCLick, onAcClick, display, onEqualsClick }) => {
    return (
        <div id="calculator">
            <div id="display">{display}</div>
            <button type="button" className="btn" id="clear" onClick={onAcClick}>AC</button>
            <div id="main">
                <div id="numbers">
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="one">1</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="two">2</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="three">3</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="four">4</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="five">5</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="six">6</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="seven">7</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="eigth">8</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="nine">9</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="zeroZero">00</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="zero">0</button>
                    <button type="button" className="number btn" onClick={onNumOprCLick} id="decimal">.</button>
                </div>
                <div id="operators">
                    <button type="button" className="operator btn" onClick={onNumOprCLick} id="add">+</button>
                    <button type="button" className="operator btn" onClick={onNumOprCLick} id="subtract">-</button>
                    <button type="button" className="operator btn" onClick={onNumOprCLick} id="divide">/</button>
                    <button type="button" className="operator btn" onClick={onNumOprCLick} id="multiply">x</button>
                </div>
            </div>
            <button type="button" className="btn" id="equals" onClick={onEqualsClick}>=</button>
        </div>
    )
};

const App = () => {

    const [display, setDisplay] = useState([]);

    const handleCLick = (e) => {
        const value = e.target.childNodes[0].data;
        value === "."
        ? setDisplay((d) => [...d, [...d].at(-1).concat(value)])
        : setDisplay((d) => [...d, value]);
    };

    const handleAcClick = () => {
        setDisplay([])
    };

    const handleEqualsClick = (array) => {
        array.map()
    }

    console.log(display)

    return (
        <Calculator
            onNumOprCLick={handleCLick}
            onAcClick={handleAcClick}
            onEqualsClick={() => handleEqualsClick(display)}
            display={display.lenght >=2 ? display.join("") : display}
        />
    )
};

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);