const Header = ({ course }) => {
  console.log('Header component: ', course.name);
  return ( <h1>{course.name}</h1> );
}

const Part = ({ name, exercises }) => {
  console.log('Part component: ', name, exercises);
  return (
    <p>
    {name} {exercises}
    </p>
  )
}

const Content = ({ course }) => {
  console.log('Content component: ', course.parts);
  return (
    <>
    <Part 
    name={course.parts[0].name}
    exercises={course.parts[0].exercises}
    />
    <Part
    name={course.parts[1].name} 
    exercises={course.parts[1].exercises}
    />
    <Part
    name={course.parts[2].name} 
    exercises={course.parts[2].exercises}
    />
    </>
  )
}

const Footer = ({ course }) => {
  const parts = course.parts;
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Header course = {course} />
    <Content course = {course} /> 
    <Footer course = {course} />
    </div>
  )
}

export default App
