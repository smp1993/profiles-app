// src/App.jsx
import { useState, useCallback } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import ProfileCard from './components/ProfileCard.jsx'
import { profiles as initialProfiles } from './data/profiles.js'

export default function App() {
  const [people, setPeople] = useState(initialProfiles)

  const [name, setName] = useState('')
  const [touched, setTouched] = useState(false)

  const trimmed = name.trim()
  const exists = people.some(
    (p) => p.name.toLowerCase() === trimmed.toLowerCase()
  )
  const isInvalid = touched && (trimmed === '' || exists)
  const errorMsg =
    trimmed === ''
      ? 'Name is required.'
      : exists
      ? 'This name already exists.'
      : ''

  const handleLike = useCallback((id) => {
    setPeople((ps) =>
      ps.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    )
  }, [])

  const handleAdd = (e) => {
    e.preventDefault()
    setTouched(true)
    if (trimmed === '' || exists) return

    const nextId = people.length
      ? Math.max(...people.map((p) => p.id)) + 1
      : 1

    setPeople((ps) => [...ps, { id: nextId, name: trimmed, likes: 0 }])
    setName('')
    setTouched(false)
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      {/* فرم افزودن پروفایل */}
      <Form noValidate onSubmit={handleAdd} className="mb-4">
        <Row className="g-2 justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Form.Label htmlFor="name" className="visually-hidden">
              Name
            </Form.Label>
            <Form.Control
              id="name"
              placeholder="Enter a unique name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              isInvalid={isInvalid}
            />
            <Form.Control.Feedback type="invalid">
              {errorMsg}
            </Form.Control.Feedback>
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="success">
              Add
            </Button>
          </Col>
        </Row>
      </Form>

      {/* کارت‌ها */}
      <Row xs={1} md={2} lg={3}>
        {people.map((p) => (
          <Col key={p.id}>
            <ProfileCard
              id={p.id}
              name={p.name}
              likes={p.likes}
              onLike={handleLike}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}