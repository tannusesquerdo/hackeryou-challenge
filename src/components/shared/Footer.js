import React, { Component } from 'react';
import { Container } from 'reactstrap';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
				<Container>
          <div className="copyright">
            <p>2018 © BEAU'S ALL NATURAL BREWING COMPANY / <a href="https://linkedin.com/in/tannusesquerdo/">Web design by Tannus Esquerdo</a></p>
          </div>
        </Container>
			</footer>
    );
  }
}
