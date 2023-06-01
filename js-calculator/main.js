import { numbersData } from "./data/numbers.js";
import { operatorsData } from "./data/operators.js";
const { createRoot } = ReactDOM;
const { useState } = React;

const Calculator = ({ onNumCLick, onOprCLick, onAcClick, display, formula, onEqualsClick }) => {

    const numbers = numbersData.map(num => {
        return (
            <button 
                key={num.id}
                type="button" 
                className="number btn" 
                onClick={onNumCLick} 
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
                onClick={onOprCLick} 
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
                value="="
                onClick={onOprCLick} 
            >
                =
            </button>
        </div>
    )
};

const App = () => {

    const [formula, setFormula] = useState([]);
    const [display, setDisplay] = useState([]);

    const handleNumberCLick = (e) => {
        const value = e.target.value;
        if (value == ".") {
            return setDisplay((d) => {
                if ([...d].indexOf('.') > 0) {
                    return [...d];
                }  else {
                    return [...d, "."];
                }
            })
        } else {
            return setDisplay((d) => [...d, value]);
        }
    };

    const handleOperatorClick = (e) => {
        const operator = e.target.value;
        const displayNumber = Number(display.join(""));
        setFormula((f) => {
            return [
                ...f,
                displayNumber,
                operator
            ]
        });
        setDisplay([]);
    };

    const handleAcClick = () => {
        setDisplay([]);
        setFormula([]);
    };

    const calculator = (prevNum, operator, nextNum) => {
        switch (operator) {
            case "x":
                return prevNum * nextNum;
            case "/":
                return prevNum / nextNum;
            case "+":
                return prevNum + nextNum;
            case "-":
                return prevNum - nextNum;
            default:
                return "not valid operators"
        }
    };

    const handleEqualsClick = (array) => {
        array.map()
    };

    console.log(`display: ${display}`);
    console.log(`displayNumber: ${Number(display.join(""))}`);
    console.log(`formula: ${formula}`);

    return (
        <Calculator
            onNumCLick={handleNumberCLick}
            onOprCLick={handleOperatorClick}
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