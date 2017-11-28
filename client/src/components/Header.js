import React, { Component } from "react";
import { Segment, Container, Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
class Header extends Component {
  state = {};
  render() {
    return (
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: 86, padding: "1em 0em", marginBottom: 100 }}
        vertical
      >
        <Container>
          <Menu inverted pointing secondary size="large">
            <Link to="/">
              <Menu.Item as="a" active>
                Home
              </Menu.Item>
            </Link>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item position="right">
              <Link to="/signin">
                <Button as="a" inverted>
                  Sign in
                </Button>
              </Link>
              <Link to="/signup">
                <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                  Sign up
                </Button>
              </Link>
            </Menu.Item>
          </Menu>
        </Container>
      </Segment>
    );
  }
}

export default Header;
