import './index.css'

const Tags = props => {
  const {details, onChangeActiveTag, isActive} = props
  const {displayText, optionId} = details

  const activeTagStyle = isActive ? 'active-btn' : 'btn'

  const changeActiveTag = () => {
    onChangeActiveTag(displayText)
  }
  return (
    <li className="tags-list-item">
      <button type="button" className={activeTagStyle}>
        {displayText}
      </button>
    </li>
  )
}

export default Tags
