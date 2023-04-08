import './index.css'

const Task = props => {
  const {details} = props
  const {task, taskCategory} = details

  return (
    <li className="task-container">
      <p className="task-text">{task}</p>
      <p className="task-category">{taskCategory}</p>
    </li>
  )
}
export default Task
