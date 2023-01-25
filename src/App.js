import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";

import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    ContactAPI.getAll().then((contacts) => {
      this.setState({ contacts });
    });
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id),
    }));

    ContactAPI.remove(contact);
  };

  createContact(contact) {
    ContactAPI.create(contact).then((contact) => {
      this.setState((state) => {
        contacts: state.contacts.concat([contact]);
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ListContacts
                contacts={this.state.contacts}
                removeContact={this.removeContact}
              />
            }
          />
          <Route
            exact
            path="/create"
            element={
              <CreateContact
                onCreateContact={(contact) => {
                  this.createContact(contact);
                }}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
