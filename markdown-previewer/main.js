const {useState} = React;

const Form = ({textValue, onChangeText}) => {

    return (
        <form>
            <div>
                <h1 className="editor--header">Editor</h1>
            </div>
            <textarea
                value={textValue}
                onChange={onChangeText}
            />
        </form>
    )
}

const Marked = ({string}) => {
    const parsed = marked.parse(string, {mangle: false, headerIds: false});
    const filtered = filterXSS(parsed);

    return (
        <div>
            <div>
                <h1 className="editor--header">Previewer</h1>
            </div>
            <div dangerouslySetInnerHTML={{ __html: filtered }} />
        </div>
    )
}

const App = () => {

    const [formData, setFormData] = useState('')

    return (
        <React.Fragment>
            <Form
                value={formData}
                onChangeText={e => setFormData(e.target.value)}
            />
            <Marked
                string={formData}
            />
        </React.Fragment>
    )
}

//render
const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>);