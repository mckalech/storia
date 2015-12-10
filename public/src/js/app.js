var ReactDOM = require('react-dom'),
	React = require('React'),
	Modal = require('./modal'),
	Box = require('./box');
var history = require('./history');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Redirect = require('react-router').Redirect;


ReactDOM.render(
	(
		<Router history={history}>
			<Route path="/" component={Box}>
				<Route path="/post/:storyId/:id" component={Modal} />
			</Route>
		</Router>
	),document.getElementById('content'));