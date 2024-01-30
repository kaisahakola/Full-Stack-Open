const Filter = ({ inputValue, handleChange }) => {
    return (
        <>
            find countries <input value={inputValue} onChange={handleChange} />
        </>
    )
}

export default Filter