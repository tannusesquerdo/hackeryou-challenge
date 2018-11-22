import React, { Component } from 'reactn';
import { Row, Container, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Featured extends Component {
  render() {
    return (
      <Row className="featured-beers">
        <Container>
          <Row >
            <Col>
              <h2 className="featured-pre-title">Lastest beau's</h2>
              <h1 className="featured-title">THE LATEST AND GREATEST</h1>
            </Col>
          </Row>
          <Row className="beers">
            {this.global.beers.slice(0, 4).map((beer, i) => {
              return (
                <React.Fragment>
                  <Col key={i} sm="12" md="6" lg="3">
                    <Link to={`/beer/${beer.id}`}>
                      <div className="beer">
                        <div className="image">
                          <img src={beer.image_thumb_url} alt={beer.name} />
                        </div>
                        <h3>{beer.name}</h3>
                      </div>
                    </Link>
                  </Col>
                </React.Fragment>
              );
            })}
          </Row>
        </Container>
      </Row>
    );
  }
}
