// src/App.jsx
import { useState, useCallback } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ProfileCard from './components/ProfileCard.jsx'
import { profiles as initialProfiles } from './data/profiles.js'

export default function App() {
  // 1) نگه‌داشتن داده‌ها در state
  const [people, setPeople] = useState(initialProfiles)

  // 2) هندلر لایک: به‌صورت immutable آپدیت می‌کنیم
  const handleLike = useCallback((id) => {
    setPeople((ps) =>
      ps.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    )
  }, [])

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

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