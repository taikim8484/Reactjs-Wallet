import React, { Component } from "react";
import { Segment, Container, Menu, Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
class Header extends Component {
  Logout() {
    localStorage.removeItem("user");
    this.props.history.push("/signin");
  }
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
            <Link to="/">
              <Menu.Item as="a">Work</Menu.Item>
            </Link>
            {localStorage.getItem("user") === null ? (
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
            ) : (
              <Menu.Item position="right">
                <Button
                  as="a"
                  inverted
                  style={{ marginLeft: "0.5em" }}
                  onClick={() => this.Logout()}
                >
                  Logout
                </Button>
              </Menu.Item>
            )}
          </Menu>
        </Container>
      </Segment>
    );
  }
}

export default withRouter(Header);
