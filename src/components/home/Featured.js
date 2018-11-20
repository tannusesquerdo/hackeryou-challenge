import React, { Component } from 'react';
import { Row, Container, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Featured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: []
    }
  }

  componentDidMount() {
    this._renderBeers(this.props.beers);
  }

  componentWillReceiveProps(nextProps) {
		if (!this.props.beers.length && nextProps.beers.length) {
			this._renderBeers(nextProps.beers);
		}
	}

  _renderBeers(beers) {
    this.setState({
      beers: beers.slice(0, 4)
    })
  }

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
            {this.state.beers.map((beer, i) => {
              return (
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
              );
            })}
          </Row>
        </Container>
      </Row>
    );
  }
}
