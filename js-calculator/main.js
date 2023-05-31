import { numbersData } from "./data/numbers.js";
import { operatorsData } from "./data/operators.js";
const { createRoot } = ReactDOM;
const { useState } = React;

const Calculator = ({ onNumOprCLick, onAcClick, display, onEqualsClick }) => {

    const numbers = numbersData.map(num => {
        return (
            <button 
                key={num.id}
                type="button" 
                className="number btn" 
                onClick={onNumOprCLick} 
                id={num.id}
            >
                {num.sign}
            </button>  
        )
    });

    const operators = operatorsData.map(opr => {
        return (
            <button 
                key={opr.id}
                type="button" 
                className="number btn" 
                onClick={onNumOprCLick} 
                id={opr.id}
            >
                {opr.sign}
            </button>  
        )
    });

    return (
        <div id="calculator">
            <div id="screen">
                <div id="formula">{display}</div>
                <div id="display">{display}</div>
            </div>
            <button type="button" className="btn" id="clear" onClick={onAcClick}>AC</button>
            <div id="main">
                <div id="numbers">
                    {numbers}
                </div>
                <div id="operators">
                    {operators}
                </div>
            </div>
            <button type="button" className="btn" id="equals" onClick={onEqualsClick}>=</button>
        </div>
    )
};

const App = () => {

    const [display, setDisplay] = useState([0]);

    const handleCLick = (e) => {
        const value = e.target.childNodes[0].data;
        value === "."
        ? setDisplay((d) => [...d, [...d].at(-1).concat(value)])
        : setDisplay((d) => [...d, value]);
    };

    const handleAcClick = () => {
        setDisplay([0])
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