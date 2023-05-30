const { createRoot } = ReactDOM;

const Calculator = () => {
    return (
        <div className="calculator">
            <div id="display"></div>
            <div id="numbers">
                <div className="number" id="decimal">.</div>
                <div className="number" id="zeroZero">00</div>
                <div className="number" id="zero">0</div>
                <div className="number" id="one">1</div>
                <div className="number" id="two">2</div>
                <div className="number" id="three">3</div>
                <div className="number" id="four">4</div>
                <div className="number" id="five">5</div>
                <div className="number" id="six">6</div>
                <div className="number" id="seven">7</div>
                <div className="number" id="eigth">8</div>
                <div className="number" id="nine">9</div>
            </div>
            <div id="operators">
                <div className="operator" id="add">+</div>
                <div className="operator" id="subtract">-</div>
                <div className="operator" id="divide">/</div>
                <div className="operator" id="multiply">*</div>
            </div>
        </div>
    )
};

const App = () => {
    return (
        <Calculator/>
    )
};

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);