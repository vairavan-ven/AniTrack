import React, { useState } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import seedData from '../utils/seedData';

const SearchAnime = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [savedAnime, setSavedAnime] = useState([]);

  const handleSearch = () => {
    const results = seedData.filter(anime =>
      anime.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSaveAnime = (anime) => {
    setSavedAnime([...savedAnime, anime]);
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Anime!</h1>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for an anime'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button onClick={handleSearch} variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchResults.length
            ? `Viewing ${searchResults.length} results:`
            : 'Search for an anime to begin'}
        </h2>
        <Row>
          {searchResults.map((anime) => (
            <Col md="4" key={anime.id}>
              <Card border='dark'>
                <Card.Body>
                  <Card.Title>{anime.title}</Card.Title>
                  <Card.Text>{anime.description}</Card.Text>
                  <Button
                    disabled={savedAnime.some(saved => saved.id === anime.id)}
                    className='btn-block btn-info'
                    onClick={() => handleSaveAnime(anime)}>
                    {savedAnime.some(saved => saved.id === anime.id)
                      ? 'This anime has already been saved!'
                      : 'Save this Anime!'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchAnime;
