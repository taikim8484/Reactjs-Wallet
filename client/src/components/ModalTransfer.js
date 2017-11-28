import React, { Component } from "react";
import { Button, Input, Modal, Label, Select } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class ModalTransfer extends Component {
  state = { users: [], to: "", amount: 0, open: false };

  componentWillMount() {
    if (localStorage.getItem("user") !== null) {
      this.getListUser();
    }
  }

  async getListUser() {
    const { data } = await axios.get("/api/users");
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const users = data
      .filter(({ username }) => username !== currentUser.username)
      .map(({ username }, index) => {
        return {
          key: index,
          value: username,
          text: username
        };
      });
    this.setState({ users });
  }

  handleTransfer = async () => {
    const { to, amount } = this.state;
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.post("/api/transfer", {
      from: currentUser.username,
      to,
      amount: parseInt(amount)
    });

    localStorage.setItem("user", JSON.stringify(data));
    this.setState({ open: false });
    this.props.updateHome();
  };

  render() {
    return (
      <Modal
        trigger={
          <Button
            floated="right"
            color="blue"
            onClick={() => this.setState({ open: true })}
          >
            Show Modal
          </Button>
        }
        open={this.state.open}
      >
        <Modal.Header>Transfer money</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Input
              labelPosition="right"
              type="number"
              placeholder="Amount"
              onChange={(e, data) => this.setState({ amount: data.value })}
            >
              <Label basic>$</Label>
              <input />
              <Label>.00</Label>
            </Input>
            <div>
              <Select
                placeholder="Select user you want to transfer"
                options={this.state.users}
                onChange={(e, data) => this.setState({ to: data.value })}
              />
            </div>
            <Button floated="right" color="green" onClick={this.handleTransfer}>
              Transfer
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(ModalTransfer);
