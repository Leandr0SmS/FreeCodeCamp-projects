const { createRoot } = ReactDOM;

const App = () => {
    return (
        <div>
            <h1>Hey</h1>
            <p>12345678900-</p>
        </div>
        
    )
};

//render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>)