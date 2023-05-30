const { createRoot } = ReactDOM;

const Calculator = () => {
    return (
        <div id="calculator">
            <div className="btn" id="display"></div>
            <div className="btn" id="clear">AC</div>
            <div id="main">
                <div id="numbers">
                    <div className="number btn" id="one">1</div>
                    <div className="number btn" id="two">2</div>
                    <div className="number btn" id="three">3</div>
                    <div className="number btn" id="four">4</div>
                    <div className="number btn" id="five">5</div>
                    <div className="number btn" id="six">6</div>
                    <div className="number btn" id="seven">7</div>
                    <div className="number btn" id="eigth">8</div>
                    <div className="number btn" id="nine">9</div>
                    <div className="number btn" id="zero">0</div>
                    <div className="number btn" id="zeroZero">00</div>
                    <div className="number btn" id="decimal">.</div>
                </div>
                <div id="operators">
                    <div className="operator btn" id="add">+</div>
                    <div className="operator btn" id="subtract">-</div>
                    <div className="operator btn" id="divide">/</div>
                    <div className="operator btn" id="multiply">*</div>
                </div>
            </div>
            <div className="btn" id="equals">=</div>
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