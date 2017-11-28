import React, { Component } from "react";
import { Table, Container, Header, Divider } from "semantic-ui-react";
import axios from "axios";

class Receipt extends Component {
  state = { receipts: [] };

  componentWillMount() {
    this.getAllReceipt();
  }

  async getAllReceipt() {
    const { data } = await axios.get("/api/receipts");
    this.setState({ receipts: data });
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
        <Header>System's receipts</Header>
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
      </Container>
    );
  }
}

export default Receipt;
