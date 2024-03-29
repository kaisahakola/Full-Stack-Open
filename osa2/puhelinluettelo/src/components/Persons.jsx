const Persons = ({ persons, deletePerson }) => {
    return (
        <div>
            {persons.map(person => {
                return (
                    <p key={person.id}>
                        {person.name} {person.number} 
                        <button onClick={() => deletePerson(person.id)}>Delete</button>
                    </p>
                )
            })}
        </div>
    )   
}

export default Persons