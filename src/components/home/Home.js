import React, { Component } from 'react';
import Featured from './Featured';
import Hero from '../shared/Hero';

class Home extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="page">
        <Hero title="Home" subtitle="Hello from the home page!" />
        <Featured {...this.props} />
      </div>
    );
  }
}

export default Home;