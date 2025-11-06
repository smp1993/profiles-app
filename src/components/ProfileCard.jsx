// src/components/ProfileCard.jsx
import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'

export default function ProfileCard({ id, name, likes, onLike, onRename, onDelete, isNameTaken }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(name)
  const [touched, setTouched] = useState(false)

  const trimmed = value.trim()
  const exists = isNameTaken(trimmed, id)
  const isInvalid = touched && (trimmed === '' || exists)
  const errorMsg =
    trimmed === '' ? 'Name is required.'
    : exists ? 'This name already exists.'
    : ''

  const handleSave = (e) => {
    e.preventDefault()
    setTouched(true)
    if (isInvalid) return
    onRename(id, trimmed)
    setEditing(false)
    setTouched(false)
  }

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        {!editing ? (
          <>
            <Card.Title className="h5 mb-2">{name}</Card.Title>

            <div className="d-flex align-items-center gap-3 mb-2">
              <span className="mb-0">Likes: {likes}</span>
              <Button variant="primary" size="sm" onClick={() => onLike(id)}>Like</Button>
            </div>

            <ButtonGroup size="sm">
              <Button variant="outline-secondary" onClick={() => { setEditing(true); setValue(name); }}>
                Edit
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  if (window.confirm(`Delete "${name}"?`)) onDelete(id)
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <Form onSubmit={handleSave}>
            <Form.Label className="visually-hidden" htmlFor={`edit-${id}`}>Name</Form.Label>
            <Form.Control
              id={`edit-${id}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setTouched(true)}
              isInvalid={isInvalid}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>

            <div className="d-flex gap-2 mt-2">
              <Button type="submit" variant="success" size="sm" disabled={trimmed === '' || exists}>
                Save
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => { setEditing(false); setTouched(false); setValue(name); }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  )
}