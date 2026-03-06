AFRAME.registerComponent('log', {
  schema: {
    //data
    message: {type: "string", default: "Hello World!"}
  },
  init: function () {
    // do something as soon as first component gets attached to the entity
    console.log(this.data.message);    
  },
  update: function () {
    // do domething when components data is updated.
    // used to modify the component's attached entity.
  },
  remove: function () {
    //do something when gets detaached from the entity
  },
  tick: function (){
    //do something on every tick or the frame.  
  }
});