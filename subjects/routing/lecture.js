import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import getJSON from './lib/getJSON'

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>AsyncProps</h1>
        {this.props.children}
      </div>
    )
  }
}

class Index extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/contacts">Contacts</Link></li>
        </ul>
      </div>
    )
  }
}


class Contacts extends React.Component {
  render() {
    return (
      <div>
        <h2>Contacts</h2>
        {this.props.children}
      </div>
    )
  }
}

class ContactsIndex extends React.Component {
  static defaultProps = {
    contacts: [{ id: 'ryan', first: 'Ryan', last: 'Florence' }]
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.contacts.map((contact) => (
            <li key={contact.id}><Link to={`/contacts/${contact.id}`}>{contact.first}</Link></li>
          ))}
        </ul>
      </div>
    )
  }
}

class Contact extends React.Component {

  static loadProps(params, cb) {
    getJSON(`https://addressbook-api.herokuapp.com/contacts/${params.contactId}`, cb)
  }

  static defaultProps = {
    contact: { id: 'ryan', first: 'Ryan', last: 'Florence' }
  }

  render() {
    let { first, last } = this.props.contact
    return (
      <div>
        <h3>{first} {last}</h3>
      </div>
    )
  }
}

render((
  <Router>
    <Route path="/" component={Main}>
      <IndexRoute component={Index}/>
      <Route path="contacts" component={Contacts}>
        <IndexRoute component={ContactsIndex}/>
        <Route path=":contactId" component={Contact}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))

