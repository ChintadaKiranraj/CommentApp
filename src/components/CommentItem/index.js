import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {eachComment, removeDeletedComment, getLikeStatus} = props
  const {name, comment, date, isLiked, initialNameBg, id} = eachComment
  const initial = name ? name[0].toUpperCase() : ''
  const likedText = isLiked ? 'isLiked' : 'isNotLiked'
  const likedImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedTime = formatDistanceToNow(date)
  console.log(postedTime)

  const onClickDeleteIcon = () => {
    removeDeletedComment(id)
  }
  const onClickingLike = () => {
    getLikeStatus(id)
  }

  return (
    <li className="each-comment">
      <div className="commenterName-time">
        <p className={`name-icon ${initialNameBg}`}>{initial}</p>
        <p className="commenter-name">{name}</p>
        <p className="time-text">less than {postedTime} ago</p>
      </div>

      <p className="comment-description">{comment}</p>

      <div className="like-delete-container">
        <div className="like-likeText-container">
          <button
            type="button"
            onClick={onClickingLike}
            className="Like-button"
          >
            <img src={likedImage} alt="like" />
          </button>

          <p className={`liked-text ${likedText}`}>Like</p>
        </div>

        <button
          type="button"
          onClick={onClickDeleteIcon}
          testid="delete"
          className="deleteButton"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
