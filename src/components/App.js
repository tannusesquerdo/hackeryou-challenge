import React, { Component } from 'reactn';
import { Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AnimatedSwitch from './AnimatedSwitch';
import { addReducer, setGlobal } from 'reactn';

import logo from '../logo.svg';
import '../styles/App.scss';
import TopBar from './shared/TopBar';
import Footer from './shared/Footer';
import Home from './home/Home';
import Beers from './beers/Beers';
import BeerItem from './beers/BeerItem';

const ACCESS_KEY = 'MDozY2I2YTUxMi1lYTAzLTExZTgtOWMwZC05N2MzZjEzYWNlODI6eVBZbVlSN1g4VzBsTFVHUmF3UHZlUms2WFRnTzhkUFVIeXRt';
const api = 'https://lcboapi.com';
const query = 'beaus&where=is_seasonal&where_not=is_dead&per_page=25';

setGlobal({
  beers: [],
  stores: [],
  selectedBeer: {}
})

class App extends Component {
  componentDidMount() {
    this.setGlobal(
      fetch(`${api}/products?q=${query}&access_key=${ACCESS_KEY}`)
        .then(response => {
          return response.json();
        })
        .then(data => ({
          beers: data.result
        }))
    )
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <TopBar />
          <Route
            render={({ location }) => (
              <TransitionGroup className="container-fluid section no-padding">
                <CSSTransition timeout={125}>
                  <AnimatedSwitch
                    key={location.key}
                    location={location}
                  >
                    <Route exact
                      path="/"
                      render={props => (
                        <Home {...props} />
                      )} />
                    <Route
                      path="/beers"
                      render={props => (
                        <Beers {...props} />
                      )}
                    />
                    <Route
                      path="/beer/:id"
                      render={props => (
                        <BeerItem {...props} />
                      )}
                    />
                  </AnimatedSwitch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
