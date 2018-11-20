import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AnimatedSwitch from './AnimatedSwitch';

import logo from '../logo.svg';
import '../styles/App.scss';
import TopBar from './shared/TopBar';
import Footer from './shared/Footer';
import Home from './home/Home';
import Beers from './beers/Beers';
import BeerItem from './beers/BeerItem';

const ACCESS_KEY = 'MDozY2I2YTUxMi1lYTAzLTExZTgtOWMwZC05N2MzZjEzYWNlODI6eVBZbVlSN1g4VzBsTFVHUmF3UHZlUms2WFRnTzhkUFVIeXRt';
const api = 'https://lcboapi.com';
const query = 'beaus&where=is_seasonal&where_not=is_dead&per_page=25'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      beers: []
    }
  }

  componentDidMount() {
    fetch(`${api}/products?q=${query}&access_key=${ACCESS_KEY}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          beers: data.result
        })
      })
  }

  render() {
    return (
      <div className="App">
        <TopBar />
        <Route
					render={({ location }) => (
						<TransitionGroup component="main" className="wrapper">
              <CSSTransition timeout={125}>
                <AnimatedSwitch
                  key={location.key}
                  location={location}
                >
                  <Route exact
                    path="/"
                    render={props => (
                      <Home {...props} beers={this.state.beers} />
                    )} />
                  <Route
                    path="/beers"
                    render={props => (
                      <Beers {...props} beers={this.state.beers} />
                    )}
                  />
                  <Route
                    path="/beer/:id"
                    render={props => (
                      <BeerItem {...props} beers={this.state.beers} />
                    )}
                  />
                </AnimatedSwitch>
              </CSSTransition>
						</TransitionGroup>
					)}
				/>
        <Footer />
      </div>
    );
  }
}

export default App;
