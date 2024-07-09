/* eslint-disable react/jsx-key */
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css' 
import { useState } from 'react'

export function Post({ author, publishedAt, content }) {
  const [comment, setComment] = useState([
    'Post muito bacana, Hein?!'
  ])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment() {
    event.preventDefault()

    setComment([...comment, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange() {
    setNewCommentText(event.target.value)
  }

  return (
    <article className={styles.post}>
      <header>
       <div className={styles.author}>
        <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
       </div>

       <time title={publishedDateFormatted} dateTime="2022-05-11 08:13:30">
          {publishedDateRelativeToNow}
       </time>
      </header>

      <div className={styles.content}>
      {content.map(line => {
          if (line.type === 'paragraph') {
            return <p>{line.content}</p>;
          } else if (line.type === 'link') {
            return <p><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu comentario</strong>

        <textarea
          name='Comment'
          placeholder='Deixe seu comentario'
          onChange={handleNewCommentChange}
          value={newCommentText}
        />

        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comment.map(comment => {
         return <Comment content={comment}/>
        })}
      </div>
    </article>
  )
}