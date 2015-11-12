////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Add routes for "/form" that renders `Form` and "/confirm" that renders
//   `Confirm`
// - Add links to "/form" and "/confirm" to the `App`
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
          <li>{/* add a link to "/form" here */}</li>
          <li>{/* add a link to "/confirm" here */}</li>
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
  render() {
    return (
      <form>
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
        <p>Show the data on location state here.</p>
      </div>
    )
  }
})

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      {/* more routes here */}
    </Route>
  </Router>
), document.getElementById('app'))

