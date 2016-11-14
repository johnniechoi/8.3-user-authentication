var Backbone = require('backbone');

var Messages = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://masterj.herokuapp.com/classes/Message'
});

var MessagesCollection = Backbone.Collection.extend({
  model: Messages,
  url: 'https://masterj.herokuapp.com/classes/Message',
  parse: function(data){
    return data.results;
  }

});

module.exports = {
  Messages: Messages,
  MessagesCollection: MessagesCollection
};
