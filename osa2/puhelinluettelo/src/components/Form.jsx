const Form = ({ handleSubmit, handleChanges, inputValues }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={inputValues[0]} onChange={handleChanges[0]} />
            </div>
            <div>
                number: <input value={inputValues[1]} onChange={handleChanges[1]} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form