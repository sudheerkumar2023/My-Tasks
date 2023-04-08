import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import Tags from '../Tags'
import EmptyTask from '../EmptyTask'
import Task from '../Task'

import './index.css'

class MyTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagsList: props.tagsList,
      taskList: [],
      category: props.tagsList[0].displayText,
      categoryId: props.tagsList[0].optionId,
      userTask: '',
      activeTag: '',
    }
  }

  onChangeSelect = event => {
    const {value} = event.target
    const {tagsList} = this.state
    const addingValue = tagsList.filter(each => each.optionId === value)
    const {displayText} = addingValue[0]
    this.setState({
      category: displayText,
      categoryId: value,
    })
  }

  onChangeUserTask = event => {
    const {value} = event.target
    this.setState({
      userTask: value,
    })
  }

  onChangeActiveTag = value => {
    const {activeTag} = this.state
    if (activeTag === value) {
      this.setState({
        activeTag: '',
      })
    } else {
      this.setState({
        activeTag: value,
      })
    }
  }

  addTaskTriggered = event => {
    event.preventDefault()
    const {userTask, category} = this.state
    if (userTask !== '') {
      const taskDetails = {
        id: uuidv4(),
        task: userTask,
        taskCategory: category,
      }

      this.setState(prevState => ({
        taskList: [...prevState.taskList, taskDetails],
        userTask: '',
        category: prevState.tagsList[0].displayText,
        categoryId: prevState.tagsList[0].optionId,
      }))
    }
  }

  render() {
    const {
      tagsList,
      userTask,
      category,
      categoryId,
      taskList,
      activeTag,
    } = this.state

    const filterList =
      activeTag !== ''
        ? taskList.filter(each => each.taskCategory === activeTag)
        : taskList
    console.log(filterList, category)
    return (
      <form onSubmit={this.addTaskTriggered} className="main-container">
        <div className="container-1">
          <h1 className="create-task-heading">Create a task!</h1>
          <div className="input-container">
            <label htmlFor="task-text" className="task-label-text">
              Task
            </label>
            <input
              type="text"
              className="task-input-field"
              placeholder="Enter the task here"
              id="task-text"
              onChange={this.onChangeUserTask}
              value={userTask}
            />
          </div>
          <div className="input-container">
            <label htmlFor="task-text" className="tag-label-text">
              Tags
            </label>
            <select
              onChange={this.onChangeSelect}
              value={categoryId}
              type="text"
              className="tags-input-filed"
              id="task-text"
            >
              {tagsList.map(each => (
                <option
                  className="select-option"
                  value={each.optionId}
                  key={each.optionId}
                >
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <div className="btn-container">
            <button type="submit" className="add-task-btn">
              Add Task
            </button>
          </div>
        </div>
        <div className="container-2">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(each => (
              <Tags
                key={each.optionId}
                details={each}
                onChangeActiveTag={this.onChangeActiveTag}
                isActive={each.displayText === activeTag}
              />
            ))}
          </ul>
          <h1 className="task-heading">Tasks</h1>
          {filterList.length === 0 ? (
            <EmptyTask />
          ) : (
            <ul className="task-list-container">
              {filterList.map(each => (
                <Task key={each.id} details={each} />
              ))}
            </ul>
          )}
        </div>
      </form>
    )
  }
}

export default MyTask
