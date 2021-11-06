import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comment extends Component {
  state = {
    inputName: '',
    inputComment: '',
    commentsList: [],
  }

  getLikeStatus = likedId => {
    this.setState(prevSta => ({
      commentsList: prevSta.commentsList.map(eachListObj => {
        if (eachListObj.id === likedId) {
          return {...eachListObj, isLiked: !eachListObj.isLiked}
        }
        return eachListObj
      }),
    }))
  }

  removeDeletedComment = commentId => {
    const {commentsList} = this.state
    const removedDeletedCommentList = commentsList.filter(
      eachList => eachList.id !== commentId,
    )
    this.setState({
      commentsList: removedDeletedCommentList,
    })
  }

  OnNameChange = event => {
    this.setState({inputName: event.target.value})
  }

  OnCommentChange = event => {
    this.setState({inputComment: event.target.value})
  }

  onAddSubmit = event => {
    event.preventDefault()
    const {inputName, inputComment} = this.state

    const colorIndex =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const NewCommit = {
      id: v4(),
      name: inputName,
      comment: inputComment,
      date: new Date(),
      isLiked: false,
      initialNameBg: colorIndex,
    }
    this.setState(prevStave => ({
      commentsList: [...prevStave.commentsList, NewCommit],
      inputName: '',
      inputComment: '',
    }))
  }

  getFromLocalStorage = () => {
    const parsedList = JSON.parse(localStorage.getItem('commentsList'))

    if (parsedList === undefined) {
      return []
    }
    return parsedList
  }

  render() {
    const {inputName, inputComment, commentsList} = this.state
    const numberOFComments = commentsList.length
    localStorage.setItem('commentsList', JSON.stringify(commentsList))
    const storedList = this.getFromLocalStorage()
    console.log(storedList, 'storedList')
    console.log(commentsList, 'commentsList')

    return (
      <div className="mainContainer">
        <div className="input-image">
          <div>
            <h1>Comments</h1>
            <p>Say Something about 4.0 technologies</p>
            <form onSubmit={this.onAddSubmit}>
              <input
                className="name-input"
                type="text"
                value={inputName}
                onChange={this.OnNameChange}
                placeholder="Your Name"
              />
              <br />
              <textarea
                rows="8"
                cols="55"
                value={inputComment}
                onChange={this.OnCommentChange}
                placeholder="Your Comment"
              />
              <br />
              <button type="submit" className="addButton">
                Add Comment
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <div className="count-comment">
          <p className="numberOFComments">{numberOFComments}</p>
          <p className="comment-head">Comments</p>
        </div>

        <ul className="list-items">
          {commentsList.map(eachComment => (
            <CommentItem
              eachComment={eachComment}
              removeDeletedComment={this.removeDeletedComment}
              getLikeStatus={this.getLikeStatus}
              key={eachComment.id}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comment
