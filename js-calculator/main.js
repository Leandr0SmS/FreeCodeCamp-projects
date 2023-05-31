import { numbersData } from "./data/numbers.js";
import { operatorsData } from "./data/operators.js";
const { createRoot } = ReactDOM;
const { useState } = React;

const Calculator = ({ onNumOprCLick, onAcClick, display, formula, onEqualsClick }) => {

    const numbers = numbersData.map(num => {
        return (
            <button 
                key={num.id}
                type="button" 
                className="number btn" 
                onClick={onNumOprCLick} 
                id={num.id}
                value={num.sign}
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
                value={opr.sign}
            >
                {opr.sign}
            </button>  
        )
    });

    return (
        <div id="calculator">
            <div id="screen">
                <div id="formula">{formula}</div>
                <div id="display">{display}</div>
            </div>
            <button 
                type="button" 
                className="btn" 
                id="clear" 
                onClick={onAcClick}
            >
                AC
            </button>
            <div id="main">
                <div id="numbers">
                    {numbers}
                </div>
                <div id="operators">
                    {operators}
                </div>
            </div>
            <button 
                type="button" 
                className="btn" 
                id="equals" 
                onClick={onEqualsClick}
            >
                =
            </button>
        </div>
    )
};

const App = () => {

    const [formula, setFormula] = useState(null);
    const [display, setDisplay] = useState([]);

    const handleCLick = (e) => {
        const value = e.target.value;
        setDisplay((d) => [...d, value]);
    };

    const handleAcClick = () => {
        setDisplay([])
    };

    const handleEqualsClick = (array) => {
        array.map()
    };

    console.log(display)

    return (
        <Calculator
            onNumOprCLick={handleCLick}
            onAcClick={handleAcClick}
            onEqualsClick={() => handleEqualsClick(display)}
            display={display.join("")}
            formula={formula}
        />
    )
};

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);