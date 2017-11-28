import React, { Component } from "react";
import { Table, Container, Header, Divider } from "semantic-ui-react";
import axios from "axios";
class Home extends Component {
  state = { username: "", balance: 0, receipts: [] };
  componentWillMount() {
    const user = localStorage.getItem("user");
    if (user === null) {
      this.props.history.push("/signin");
    } else {
      const userJson = JSON.parse(user);
      this.setState({
        username: userJson.username,
        balance: userJson.balance
      });
      this.getReceipt(userJson.username);
    }
  }
  async getReceipt(username) {
    const receipts = await axios.get(`/api/receipt?username=${username}`);
    this.setState({ receipts: receipts.data });
  }

  renderRow() {
    return this.state.receipts.map(({ to, from, amount, timestamp }) => {
      return (
        <Table.Row>
          <Table.Cell>{to}</Table.Cell>
          <Table.Cell>{from}</Table.Cell>
          <Table.Cell>{amount}</Table.Cell>
          <Table.Cell>{timestamp}</Table.Cell>
        </Table.Row>
      );
    });
  }
  render() {
    return (
      <Container text>
        <Header>Username: {this.state.username}</Header>

        <Header>Balance: {this.state.balance}</Header>
        <Divider />
        <Table color="green">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>To</Table.HeaderCell>
              <Table.HeaderCell>From</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* <Table.Row>
              <Table.Cell>Apples</Table.Cell>
              <Table.Cell>200</Table.Cell>
              <Table.Cell>0g</Table.Cell>
            </Table.Row> */}
            {this.renderRow()}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default Home;
