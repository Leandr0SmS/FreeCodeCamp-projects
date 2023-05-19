const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

const QuoteBox = ({onNewQuoteClick}) => {
    return (
        <div className="quote-box" id="quote-box">
            <div className="quote-text">
                <img
                    className="quote_icon"
                    src="./images/quote_icon.svg"
                    alt="quote icon"
                    aria-hidden="false"
                    role="img"
                /><span id="text"></span>
            </div>
            <div className="quote-author">- <span id="author"></span></div>
            <div className="buttons">
                <a
                    className="button"
                    id="tweet-quote"
                    title="Tweet this quote!"
                    href="twitter.com/intent/tweet"
                    target="_top"
                >
                    <i className="fa fa-twitter"></i>
                </a>
                <button className="button" id="new-quote" onClick={onNewQuoteClick}>New quote</button>
            </div>
        </div>
    )
};


const App = () => {

    const [colorIndex, setColorIndex] = React.useState(0);
    
    document.body.style.backgroundColor = `${colors[colorIndex]}`;

    const handleNewQuoteClick = () => {
        const randomIndex = () => Math.floor(Math.random() * (colors.length));
        let i = randomIndex();
        while (i === colorIndex) {
            i = randomIndex();
        }
        setColorIndex(i);
        console.log(i)
        document.body.style.backgroundColor = `${colors[colorIndex]}`;
    };

    console.log(colors[colorIndex])
    return (
        <QuoteBox
            onNewQuoteClick={handleNewQuoteClick}
        />
    )
};

//render
const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>);
