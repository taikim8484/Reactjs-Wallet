import React, { Component } from "react";
import { Table, Container, Header, Divider, Button } from "semantic-ui-react";
import ModalTransfer from "./ModalTransfer";
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

  updateHome() {
    const { username, balance } = JSON.parse(localStorage.getItem("user"));
    this.setState({
      username,
      balance
    });
    this.getReceipt(username);
  }

  renderRow() {
    return this.state.receipts.map(({ to, from, amount, timestamp }) => {
      const date = new Date(timestamp);
      return (
        <Table.Row key={timestamp}>
          <Table.Cell>{from}</Table.Cell>
          <Table.Cell>{to}</Table.Cell>
          <Table.Cell>{amount}</Table.Cell>
          <Table.Cell>{date.toLocaleString()}</Table.Cell>
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
              <Table.HeaderCell>From</Table.HeaderCell>
              <Table.HeaderCell>To</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderRow()}</Table.Body>
        </Table>
        <ModalTransfer updateHome={() => this.updateHome()} />
      </Container>
    );
  }
}

export default Home;
