import React, { Component } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

export default class Hero extends Component {
  render() {
    return (
      <div className="hero">
        <Container>
          <h2 className="hero-subtitle">{this.props.subtitle}</h2>
          <h1 className="hero-title">{this.props.title}</h1>
        </Container>
			</div>
    );
  }
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}
