var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');

var AccountContainer = require('./components/login.jsx').AccountContainer;
var MessagesContainer = require('./components/message.jsx').MessageContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'messages/': 'messages'
  },
  index: function(){
    ReactDom.render(
      React.createElement(AccountContainer),
      document.getElementById('app')
    )
  },
  messages: function(){
    ReactDom.render(
      React.createElement(MessagesContainer, {router: this}),
      document.getElementById('app')
    )
  }
})

var router = new AppRouter();

module.exports = {
  router
}
