const { useEffect, useState } = React;
const { createRoot } = ReactDOM;

let quotesData;
fetch("https://type.fit/api/quotes")
    .then(res => res.json())
    .then(data => {
        console.log("setData")
        quotesData = data
    })
    .then(() => {
        //render
        const app = document.getElementById('root');
        const root = createRoot(app);
        root.render(<App/>);
    })

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

const QuoteBox = ({onNewQuoteClick, color, text, author}) => {
    return (
        <div className="quote-box" id="quote-box">
            <div className="quote-text">
                <i className="fa-sharp fa-solid fa-quote-left" style={{color: `${color}`}}></i>
                <span id="text">{text}</span>
            </div>
            <div className="quote-author">- <span id="author">{author}</span></div>
            <div className="buttons">
                <a
                    className="button"
                    id="tweet-quote"
                    title="Tweet this quote!"
                    href="twitter.com/intent/tweet"
                    target="_top"
                >
                <i className="fa-brands fa-twitter" style={{color: `${color}`}}></i>
                </a>
                <button className="button" id="new-quote" onClick={onNewQuoteClick}>New quote</button>
            </div>
        </div>
    )
};


const App = () => {

    const [colorIndex, setColorIndex] = useState(0);

    document.body.style.backgroundColor = `${colors[colorIndex]}`;  

    const randomIndex = (array) => Math.floor(Math.random() * (array.length));

    const handleNewQuoteClick = () => {
        let i = randomIndex(colors);
        while (i === colorIndex) {
            i = randomIndex(colors);
        }
        setColorIndex(i);
        document.body.style.backgroundColor = `${colors[colorIndex]}`;
    };

    return (
        <QuoteBox
            onNewQuoteClick={handleNewQuoteClick}
            color={colors[colorIndex]}
            text={quotesData[randomIndex(quotesData)].text}
            author={quotesData[randomIndex(quotesData)].author}
        />
    )
};

