/* eslint-disable react/prop-types */
const Notification = ({ notification }) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <>
            {notification && (
                <div style={style}>
                    {notification}
                </div>
            )}
        </>
    )
}

export default Notification