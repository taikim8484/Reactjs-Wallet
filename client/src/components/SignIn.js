import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

import { Link } from "react-router-dom";
class SignIn extends Component {
  state = { username: "", password: "", error: false };
  async handleSummitForm() {
    const { username, password } = this.state;
    axios
      .post("/api/signin", { username, password })
      .then(user => {
        localStorage.setItem("user", JSON.stringify(user.data[0]));
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: true, username: "", password: "" });

        console.log(error);
      });
  }
  render() {
    console.log(this.props);
    return (
      <div className="login-form">
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, marginTop: -50 }}>
            {this.state.error ? (
              <Message warning>
                <Message.Header>Invalid username or password</Message.Header>
              </Message>
            ) : (
              <div />
            )}
            <Header as="h2" color="teal" textAlign="center">
              Sign in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={(e, { value }) => {
                    this.setState({ username: value });
                  }}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={(e, { value }) => {
                    this.setState({ password: value });
                  }}
                />
                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={() => this.handleSummitForm()}
                >
                  Sign in
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us?<Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default SignIn;
