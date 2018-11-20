import React, { Component } from 'react';
import {
  Container,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table
} from 'reactstrap';
import classnames from 'classnames';

import Hero from '../shared/Hero';
import Map from './MapStores';

export default class BeerItem extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      beer: {},
      stores: [],
      activeTab: '1'
    }
  }

  componentDidMount() {
    if(this.props.beers.length) {
      this._renderBeer(this.props.beers)
    }

    const ACCESS_KEY = 'MDozY2I2YTUxMi1lYTAzLTExZTgtOWMwZC05N2MzZjEzYWNlODI6eVBZbVlSN1g4VzBsTFVHUmF3UHZlUms2WFRnTzhkUFVIeXRt';
    const product_id = this.props.match.params.id;

    fetch(`https://lcboapi.com/stores?product_id=${product_id}&access_key=${ACCESS_KEY}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ stores: data.result })
      })
  }

  componentWillReceiveProps(nextProps) {
		if (!this.props.beers.length && nextProps.beers.length) {
			this._renderBeer(nextProps.beers);
		}
  }

  _renderBeer(beers) {
		let beer = beers.filter(beer => {
			return beer.id.toString() === this.props.match.params.id;
    });
		if (beer.length) {
			this.setState({ beer: beer[0] });
		}
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { beer } = this.state;
    return (
      <div>
        <Hero title={beer && beer.name} subtitle={beer && beer.varietal} />
        <Container fluid className="section">
          <Container>
            <Row>
              <Col sm="4">
                <div className="beer-image">
                  {beer && <img src={beer.image_url} alt={beer.name} />}
                </div>
              </Col>
              <Col sm={{ size: 7, offset: 1 }}>
                <div className="beer-header">
                  <h2>{beer && beer.name}</h2>
                  <p className="package">{beer && beer.package}</p>
                </div>
                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                      >
                        Description
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                      >
                        Aditional Information
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12" className="desc">
                          {beer && beer.tasting_note && <p>{beer.tasting_note}</p>}
                          {beer && !beer.tasting_note && <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris arcu felis, mattis quis nisi sed, dignissim sodales arcu. Suspendisse nec mollis libero. Pellentesque auctor mattis purus quis commodo. Etiam ullamcorper, odio non condimentum dictum, ante nulla tincidunt enim, vitae finibus tellus dui ac felis. Donec dictum consequat dui, non laoreet erat varius vitae. Proin ut faucibus purus. Aenean metus sapien, semper pharetra tempor in, faucibus sed enim. Praesent semper, eros eu commodo lacinia, sapien lectus iaculis dui, id auctor magna quam et orci.</p>}
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <Table striped>
                            <tbody>
                              <tr>
                                <th>Size</th>
                                <td><p>{beer && beer.package}</p></td>
                              </tr>
                              <tr>
                                <th>ALC/VOL</th>
                                <td><p>{beer && (beer.alcohol_content / 100)}%</p></td>
                              </tr>
                              <tr>
                                <th>Style</th>
                                <td><p>{beer && beer.style}</p></td>
                              </tr>
                              <tr>
                                <th>Varietal</th>
                                <td><p>{beer && beer.varietal}</p></td>
                              </tr>
                              <tr>
                                <th>Origin</th>
                                <td><p>{beer && beer.origin}</p></td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container fluid className="section stores">
          <Container>
            <Row >
              <Col>
                <h2 className="stores-pre-title">find our beer</h2>
                <h1 className="stores-title">Available at…</h1>
              </Col>
            </Row>
            <Row>
              <Map />
            </Row>
          </Container>
        </Container>
			</div>
    );
  }
}
