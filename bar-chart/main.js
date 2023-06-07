const { createRoot } = ReactDOM;

const App = () => {
    return (
        <h1>Hey</h1>
    )
}

//render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>)