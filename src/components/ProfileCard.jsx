// src/components/ProfileCard.jsx
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function ProfileCard({ id, name, likes, onLike }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="h5 mb-2">{name}</Card.Title>

        <div className="d-flex align-items-center gap-3">
          <span className="mb-0">Likes: {likes}</span>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onLike(id)}
            aria-label={`Like ${name}`}
          >
            Like
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}