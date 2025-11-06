// src/App.jsx
import { useState, useCallback, useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import ProfileCard from './components/ProfileCard.jsx'
import { profiles as initialProfiles } from './data/profiles.js'

export default function App() {
  // لیست پروفایل‌ها
  const [people, setPeople] = useState(initialProfiles)

  // --- Part 5: فرم افزودن ---
  const [name, setName] = useState('')
  const [touched, setTouched] = useState(false)

  const trimmed = name.trim()
  const existsForAdd = people.some(p => p.name.toLowerCase() === trimmed.toLowerCase())
  const isInvalidAdd = touched && (trimmed === '' || existsForAdd)
  const errorMsgAdd = trimmed === '' ? 'Name is required.' : existsForAdd ? 'This name already exists.' : ''

  const handleAdd = (e) => {
    e.preventDefault()
    setTouched(true)
    if (trimmed === '' || existsForAdd) return

    const nextId = people.length ? Math.max(...people.map(p => p.id)) + 1 : 1
    setPeople(ps => [...ps, { id: nextId, name: trimmed, likes: 0 }])
    setName('')
    setTouched(false)
  }

  // --- Part 4: like ---
  const handleLike = useCallback((id) => {
    setPeople(ps => ps.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p)))
  }, [])

  // --- Part 6: rename / delete ---
  const isNameTaken = useCallback((candidate, selfId) => {
    const t = candidate.trim().toLowerCase()
    return people.some(p => p.id !== selfId && p.name.toLowerCase() === t)
  }, [people])

  const handleRename = useCallback((id, newName) => {
    setPeople(ps => ps.map(p => (p.id === id ? { ...p, name: newName } : p)))
  }, [])

  const handleDelete = useCallback((id) => {
    setPeople(ps => ps.filter(p => p.id !== id))
  }, [])

  // --- جدول اختیاری: فیلتر و سورت ساده ---
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')   // 'name' | 'likes'
  const [dir, setDir] = useState('asc')          // 'asc' | 'desc'

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let arr = people.filter(p => p.name.toLowerCase().includes(q))
    arr.sort((a, b) => {
      const mul = dir === 'asc' ? 1 : -1
      if (sortBy === 'likes') return (a.likes - b.likes) * mul
      return a.name.localeCompare(b.name) * mul
    })
    return arr
  }, [people, query, sortBy, dir])

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      {/* فرم افزودن پروفایل */}
      <Form noValidate onSubmit={handleAdd} className="mb-4">
        <Row className="g-2 justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Form.Control
              placeholder="Enter a unique name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              isInvalid={isInvalidAdd}
            />
            <Form.Control.Feedback type="invalid">{errorMsgAdd}</Form.Control.Feedback>
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="success" disabled={!trimmed || existsForAdd}>Add</Button>
          </Col>
        </Row>
      </Form>

      {/* کارت‌ها با ویرایش/حذف */}
      <Row xs={1} md={2} lg={3} className="mb-4">
        {people.map((p) => (
          <Col key={p.id}>
            <ProfileCard
              id={p.id}
              name={p.name}
              likes={p.likes}
              onLike={handleLike}
              onRename={handleRename}
              onDelete={handleDelete}
              isNameTaken={isNameTaken}
            />
          </Col>
        ))}
      </Row>

      {/* جدول اختیاری با فیلتر و سورت */}
      <h2 className="h5 mb-3">Directory</h2>
      <Row className="g-2 align-items-center mb-2">
        <Col xs={12} md="auto">
          <Form.Control
            placeholder="Filter by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="likes">Sort by Likes</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Form.Select value={dir} onChange={(e) => setDir(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </Form.Select>
        </Col>
      </Row>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th style={{width: '64px'}}>ID</th>
            <th>Name</th>
            <th style={{width: '120px'}}>Likes</th>
          </tr>
        </thead>
        <tbody>
          {visible.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.likes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}