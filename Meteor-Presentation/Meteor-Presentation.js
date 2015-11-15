Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  //This code runs in the client webpage
  Template.body.helpers({
    resolutions: function(){
      //give reolosiutions if it is unchecked in a session
      if(Session.get('hideFinished')){
        return Resolutions.find({checked: {$ne: true}});
      }else{
        return Resolutions.find();
      }
    },

    //Makes sure that the sessign variable it synced
    hideFinished: function() {
      return Session.get('hideFinished');
    }
  });

  //how to call any event in a meteor project
  Template.body.events({
    //this is a function when the form is submitted this happens (triggered by events)
    'submit .new-resolution': function(event) {
      //variable holding the Tile of the form 
      var title = event.target.title.value;

      //add record to database (Store the title )
      Resolutions.insert({
        title: title, 
        createdAt: new Date()
      });

      //clear the form (the text)
      event.target.title.value ="";

      //This prevents a page refeesh due to the submition of the form 
      return false;
    }
    ,//Remeber the god dam comma
    'change .hide-finished': function (event){
      Session.set('hideFinished', event.target.checked)
    }
  });

  Template.resolution.events({

    //check box clicked event - stores the checked state
    'click .toggle-checked': function () {
      Resolutions.update(this._id, {$set: {checked: !this.checked}});
    }
    , // <- need this comma between functions
    //click event since its a button!
    'click .delete': function (){
      //remove the element from the db (_id)
      //remove this id that this is attached to 
      Resolutions.remove(this._id); 
    }

  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
