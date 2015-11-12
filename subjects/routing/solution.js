////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Add routes for "/form" that renders `Form` and "/confirm" that renders
//   `Confirm`
// - When the form is submitted, transition to `/confirm` with the form data
//   as location state, you can get the values with `serializeForm(<form node>)`
// - display the contents of `this.props.location.state` in `Confirm`
// - if there is no location state, say something else
// - click the "some page" link, and then click the back button

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import serializeForm from 'form-serialize'

const App = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/form">Go to the form</Link></li>
          <li><Link to="/confirm">Confirm</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const Index = React.createClass({
  render() {
    return (
      <div>
        <h1>Its like a clientside post</h1>
      </div>
    )
  }
})

const Form = React.createClass({
  handleSubmit(event) {
    event.preventDefault()
    const formData = serializeForm(event.target, { hash: true })
    this.props.history.pushState(formData, '/confirm')
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>Favorite Food</label>{' '}
          <input type="text" name="favoriteFood" defaultValue="Tacos"/>
        </p>
        <p>
          <label>Favorite Drink</label>{' '}
          <input type="text" name="favoriteDrink" defaultValue="Horchata"/>
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    )
  }
})

const Confirm = React.createClass({
  render() {
    return (
      <div>
        <h1>Confirm</h1>
        {this.props.location.state ? (
          <div>
            <h2>Please confirm:</h2>
            <pre>{JSON.stringify(this.props.location.state, null, 2)}</pre>
            <p>Now click the link to "confirm"</p>
          </div>
        ) : (
          <div>
            <p>No data, click the back button</p>
          </div>
        )}
      </div>
    )
  }
})

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="/form" component={Form}/>
      <Route path="/confirm" component={Confirm}/>
    </Route>
  </Router>
), document.getElementById('app'))


