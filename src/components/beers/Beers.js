import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import TransitionGroup from "react-transition-group/TransitionGroup";
import * as Animated from "animated/lib/targets/react-dom";

import Hero from '../shared/Hero';
import imageDefault from '../../images/no-image.png';

class Beers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      animations: []
    };
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
    this.setState(
      {
        beers: beers,
        animations: beers.map((_, i) => new Animated.Value(0))
      },
      () => {
        Animated.stagger(
          100,
          this.state.animations.map(anim =>
            Animated.spring(anim, { toValue: 1 })
          )
        ).start();
      }
    )
  }

  render() {
    return (
      <div className="page">
        <Hero title="OUR BEER" subtitle="find out more about" />
        <Container className="contents section">
          <TransitionGroup component="div" className="row">
            {this.state.beers.map((beer, i) => {
              const style = {
                opacity: this.state.animations[i],
                transform: Animated.template`
                  translate3d(0,${this.state.animations[i].interpolate({
                  inputRange: [0, 1],
                  outputRange: ["12px", "0px"]
                })},0)
                `
              };
              return (
                <Col sm="6" md="4" lg="3" key={i} className="beer-wrapper">
                  <Animated.div style={style}>
                    <Link to={`/beer/${beer.id}`}>
                      <img src={beer.image_thumb_url || imageDefault} alt={beer.name} />
                      <h4>{beer.name}</h4>
                    </Link>
                  </Animated.div>
                </Col>
              );
            })}
          </TransitionGroup>
        </Container>
      </div>
    );
  }
}

export default Beers;