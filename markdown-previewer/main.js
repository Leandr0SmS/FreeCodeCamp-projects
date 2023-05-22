const {useState} = React;

const Form = ({textValue, onChangeText}) => {

    return (
        <form>
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
      <div dangerouslySetInnerHTML={{ __html: filtered }} />
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