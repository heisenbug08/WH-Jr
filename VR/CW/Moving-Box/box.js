AFRAME.registerComponent('move', {
  schema: {
    moveY: {
      type: "number",
      default: 1
    },
  },
  tick: function() {
    this.data.moveY = this.data.moveY + 0.01;
    let p = this.el.getAttribute('position');
    p.y = this.data.moveY;
    this.el.setAttribute('position', { x: p.x, y: p.y, z: p.z });
  }
})

AFRAME.registerComponent('fall-down', {
  schema: {
    moveY: {
      type: "number",
      default: -2
    }
  },
  tick: function(){
    window.addEventListener("click", (e)=>{
      this.data.moveY = this.data.moveY - 0.009
    })
    let p = this.el.getAttribute('position');
    p.y = this.data.moveY;
    this.el.setAttribute('position', { x: p.x, y: p.y, z: p.z });
  }
})