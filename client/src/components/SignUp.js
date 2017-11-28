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
class SignUp extends Component {
  state = { username: "", password: "" };
  async handleSummitForm() {
    const { username, password } = this.state;
    const user = await axios.post("/api/signup", { username, password });
    console.log(user);
    this.props.history.push("/signin");
  }
  render() {
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
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Sign up a new account
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
                  Sign up
                </Button>
              </Segment>
            </Form>
            <Message>
              You want to <Link to="/signin">Sign in</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default SignUp;
