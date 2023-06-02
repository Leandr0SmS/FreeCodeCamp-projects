import { numbersData } from "./data/numbers.js";
import { operatorsData } from "./data/operators.js";
import { calculations } from "./functions/calc-functions.js"
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
                onClick={onEqualsClick} 
            >
                =
            </button>
        </div>
    )
};

const App = () => {

    const [formula, setFormula] = useState([]);
    const [display, setDisplay] = useState([0]);

    let result;
    if (formula[formula.length - 1] == "=") {
        result = calculations(formula.slice(0, formula.length - 1));
        setDisplay(result)
        setFormula([...formula.slice(0, formula.length - 1)])
    }

    const handleNumberCLick = (e) => {
        const value = e.target.value;
        if (value == ".") {
            setDisplay((d) => {
                if ([...d].indexOf('.') > 0) {
                    return [...d];
                }  else {
                    return [...d, "."];
                }
            })
        } else {
            setDisplay((d) => [...d, parseFloat(value)]);
        }
    };

    const handleOperatorClick = (e) => {
        const operator = e.target.value;
        const displayNumber = parseFloat(display.join(""));
        setFormula((f) => {
            return [
                ...f,
                displayNumber,
                operator
            ]
        });
        setDisplay([0]);
    };

    const handleAcClick = () => {
        setDisplay([0]);
        setFormula([]);
    };

    console.log(display)
    console.log(formula)

    return (
        <Calculator
            onNumCLick={handleNumberCLick}
            onOprCLick={handleOperatorClick}
            onAcClick={handleAcClick}
            onEqualsClick={handleOperatorClick}
            display={parseFloat(display.join(''))}
            formula={formula}
        />
    )
};

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);