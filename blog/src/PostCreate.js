import React, { useState} from 'react'
import axios from 'axios'
export default () => {
    const [title, setTitle] = useState('')
    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('https://6112ceeb-d237-40ea-89c8-9997347d1b30-4000.apps.codespaces.githubusercontent.com/posts', {
            title
        });
        setTitle('');
    }
    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="form-control"/>
            </div>
            <button type= "submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
}