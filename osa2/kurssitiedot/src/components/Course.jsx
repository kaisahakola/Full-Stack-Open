const Course = ({ courses }) => {
    return (
        <>
            {courses.map(course => {
                return (
                    <div key={course.id}>
                        <Header header={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                )
            })}
        </>
    )
}

const Header = ({ header }) => {
    return (
        <>
            <h2>{header}</h2>
        </>
    )
}
  
const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => {
                return <Part key={part.id} part={part} />
            })}
        </>
    )
}

const Part = ({ part }) => {
    return (
        <>
            <p>{part.name} {part.exercises}</p>
        </>
    )
}

const Total = ({ parts }) => {

    const total = parts.reduce((accumulator, part) => {
        return accumulator + part.exercises
    }, 0)

    return (
        <>
            <p>Number of exercises: {total}</p>
        </>
    )
}

export default Course