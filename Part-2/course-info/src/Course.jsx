const Header = ({ course }) => {
  console.log('Header component: ', course.name);
  return ( <h2>{course.name}</h2> );
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
    {course.parts.map(part => (
      <Part 
        key={part.id}
        name={part.name}
        exercises={part.exercises}
      />
    ))}
    </>
  )
}

const Footer = ({ course }) => {
  const sum = course.parts.reduce((a, i) => a + i.exercises, 0);
  return (
    <h3>total of {sum} exercises</h3>
  )
}

const Course = ({ course }) => {
  return (
    <div key={course.id}>
    <Header course = {course} />
    <Content course = {course} /> 
    <Footer course = {course} />
    </div>
  )
}

export default Course
