const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = () => {
  return (
    <div>
      <Part name='Fundamentals of React' count={10} />
      <Part name='Using props to pass data' count={7} />
      <Part name='State of a component' count={14} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.count}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of Exercises {props.count1 + props.count2 + props.count3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total count1={10} count2={7} count3={14} />
    </div>
  )
}

export default App