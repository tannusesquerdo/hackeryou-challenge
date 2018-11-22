import React, { Component } from 'reactn';
import { Button } from 'reactstrap';
import Featured from './Featured';
import Hero from '../shared/Hero';

class Home extends Component {
  render() {
    return (
      <div className="section no-padding-top">
        <Hero title="seasonal beverages" subtitle="A very warm welcome to our" />
        <Featured {...this.global} />
        <div className="btn-explore">
          <Button onClick={() => this.props.history.push(`/beers`)} className="btn" size="lg">Explore</Button>
        </div>
      </div>
    );
  }
}

export default Home;