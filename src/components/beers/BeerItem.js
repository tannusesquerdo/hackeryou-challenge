import React, { Component } from 'reactn';
import {
  Container,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardLink
} from 'reactstrap';
import classnames from 'classnames';

import Hero from '../shared/Hero';
import Map from './MapStores';

export default class BeerItem extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    }
  }

  componentDidMount() {
    if(this.global.beers.length) {

      let beer = this.global.beers.filter(beer => {
        return beer.id.toString() === this.props.match.params.id;
      });
      if (beer.length) {
        this.setGlobal({ selectedBeer: beer[0] });
      }

      const ACCESS_KEY = 'MDozY2I2YTUxMi1lYTAzLTExZTgtOWMwZC05N2MzZjEzYWNlODI6eVBZbVlSN1g4VzBsTFVHUmF3UHZlUms2WFRnTzhkUFVIeXRt';
      const product_id = this.props.match.params.id;

      fetch(`https://lcboapi.com/stores?product_id=${product_id}&access_key=${ACCESS_KEY}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.setGlobal({ stores: data.result })
        })

    }
  }

  componentWillUnmount() {
    this.setGlobal(
      {
        selectedBeer: {},
        stores: []
      }
    );
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Hero title={this.global.selectedBeer && this.global.selectedBeer.name} subtitle={this.global.selectedBeer && this.global.selectedBeer.varietal} />
        <Container fluid className="section">
          <Container>
            <Row>
              <Col sm="4">
                <div className="beer-image">
                  {this.global.selectedBeer && <img src={this.global.selectedBeer.image_url} alt={this.global.selectedBeer.name} />}
                </div>
              </Col>
              <Col sm={{ size: 7, offset: 1 }}>
                <div className="beer-header">
                  <h2>{this.global.selectedBeer && this.global.selectedBeer.name}</h2>
                  <p className="package">{this.global.selectedBeer && this.global.selectedBeer.package}</p>
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
                          {this.global.selectedBeer && this.global.selectedBeer.tasting_note && <p>{this.global.selectedBeer.tasting_note}</p>}
                          {this.global.selectedBeer && !this.global.selectedBeer.tasting_note && <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris arcu felis, mattis quis nisi sed, dignissim sodales arcu. Suspendisse nec mollis libero. Pellentesque auctor mattis purus quis commodo. Etiam ullamcorper, odio non condimentum dictum, ante nulla tincidunt enim, vitae finibus tellus dui ac felis. Donec dictum consequat dui, non laoreet erat varius vitae. Proin ut faucibus purus. Aenean metus sapien, semper pharetra tempor in, faucibus sed enim. Praesent semper, eros eu commodo lacinia, sapien lectus iaculis dui, id auctor magna quam et orci.</p>}
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
                                <td><p>{this.global.selectedBeer && this.global.selectedBeer.package}</p></td>
                              </tr>
                              <tr>
                                <th>ALC/VOL</th>
                                <td><p>{this.global.selectedBeer && (this.global.selectedBeer.alcohol_content / 100)}%</p></td>
                              </tr>
                              <tr>
                                <th>Style</th>
                                <td><p>{this.global.selectedBeer && this.global.selectedBeer.style}</p></td>
                              </tr>
                              <tr>
                                <th>Varietal</th>
                                <td><p>{this.global.selectedBeer && this.global.selectedBeer.varietal}</p></td>
                              </tr>
                              <tr>
                                <th>Origin</th>
                                <td><p>{this.global.selectedBeer && this.global.selectedBeer.origin}</p></td>
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
              <Col className="map-header">
                <h2 className="stores-pre-title">find our beer</h2>
                <h1 className="stores-title">Available at…</h1>
              </Col>
            </Row>
            <Row className="map-container">
              <Col sm="9">
                <Map {...this.global} />
              </Col>
              <Col sm="3" className="stores-card">
                {this.global.stores.map((store, i) => {
                  return (
                    <Card>
                      <CardBody>
                        <CardTitle>{store.name}</CardTitle>
                        <CardSubtitle>{store.address_line_1} - {store.city}</CardSubtitle>
                      </CardBody>
                      <CardBody>
                        <CardLink href={`https://www.google.com/maps/dir/Current+Location/${store.latitude},${store.longitude}`}>Get Directions</CardLink>
                      </CardBody>
                    </Card>
                  )
                })}
              </Col>
            </Row>
          </Container>
        </Container>
			</React.Fragment>
    );
  }
}
