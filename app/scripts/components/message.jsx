var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var NavBar = require('../template.jsx').NavBar;
var Messages = require('../models/message.js').Messages;
var MessagesCollection = require('../models/message.js').MessagesCollection;

console.log("localstorage:", localStorage);

var MessageForm = React.createClass({
  getInitialState: function(){
    return {
      message: ''
    }
  },
  messageOnChange: function(e){
    e.preventDefault();
    this.setState({message: e.target.value})
    console.log("onchange:", this.state.message);
  },
  handleMessagePost: function(e){
    e.preventDefault();
    var messageData = {
      username: localStorage.getItem('username'),
      message: this.state.message
    }
    console.log("messageData:", messageData);
    this.props.post(messageData)
  },
  render: function(){
    var messagesPrep = this.props.messages.messagesCollection.models
    var messagesShow = messagesPrep.map(function(message){
      // console.log('map:', messages);
      return(
        <li className="list-group-item" key={message.get('objectId')}>
          {message.get('username')}:  {message.get('message')}
        </li>
      )
    })
    // console.log("show Message:", messagesShow);
    return(
      <form onSubmit={this.handleMessagePost}>
        <h3>Message:</h3>
        <div >
          {messagesShow}
        </div>
        <li>
          <input onChange={this.messageOnChange} value={this.state.message} type="text" placeholder="Start talking!" className="form-control"></input>
        </li>
        <button type="submit" className="btn" >post!</button>
      </form>
    )
  }
})

var MessageContainer = React.createClass({
  getInitialState: function(){
    var messages = new Messages();
    var messagesCollection = new MessagesCollection()
    return {
      messages: messages,
      messagesCollection: messagesCollection
    }
  },
  componentWillMount: function(){
    var self = this;
    var messagesCollection = this.state.messagesCollection;
    messagesCollection.fetch().then((response)=>{
      console.log('data:', response);
      self.setState({messagesCollection: messagesCollection});
    })
  },
  post: function(messageData){
    // this.setState(messageData)
    var messagesCollection = this.state.messagesCollection;

    messagesCollection.create({
      message: messageData.message,
      user: messageData.username
    });

    // console.log('post:', this.state);
    this.setState({messagesCollection: messagesCollection })
      // message: message,
      // username: localStorage.getItem('username'),
      // user: {__type: "Pointer", className: "_User", objectId: user}
  },
  render: function(){
    console.log("messageContainer:", this.state);
    return(
      <div>
        <NavBar/>
        <MessageForm messages={this.state} post={this.post}/>
      </div>
    )
  }
})

module.exports = {
  MessageContainer
}
