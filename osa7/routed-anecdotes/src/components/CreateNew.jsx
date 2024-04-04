/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useField } from "../hooks"

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!content.value || !author.value || !info.value) {
            return;
        }

        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
    }

    const handleReset = () => {
        content.reset()
        author.reset()
        info.reset()
    }

    const value = ({ reset, ...rest}) => rest

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
            <div>
                content
                <input {...value(content)} />
            </div>
            <div>
                author
                <input {...value(author)} />
            </div>
            <div>
                url for more info
                <input {...value(info)} />
            </div>
            <button type="submit">create</button>
            <button onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}
  
export default CreateNew