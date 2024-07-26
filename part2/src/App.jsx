const Course = (props) => {
  console.log(props)
  console.log('name: ', props.name)
  console.log('props parts: ', props.parts)
  console.log('props parts 0: ', props.parts[0].exercises)
  console.log('total parts: ', props.parts.reduce((s, p) => s + p, 0))
  return (
    <div>
      <h1>{props.name}</h1>
      <ul>
        {props.parts.map(part => <li>{part.name} {part.exercises}</li>)}
      </ul>
      <b>total of {props.parts.reduce((a, c) => a + c.exercises, 0)} exercises</b>
    </div>
  )
}

const Content = (parts) => {
  console.log('parts: ', parts)
  return (
    <ul>
    {parts.map(entry => <li>{entry.name} {entry.exercises}</li>)}
    </ul>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course {...course} />
}

export default App