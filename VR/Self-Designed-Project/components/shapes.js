let shape = "box";
let color = "#ffffff";
let scale = "1 1 1";
let rotation = "0 0 0";

AFRAME.registerComponent("shapes", {
  shapeCount: 0,
  init: function () {
    $("#color-picker").val("#ffffff");
    $(window).on("contextmenu", () => {
      return false;
    });
    $(window).click((e) => {
      if (
        e.which == 3 &&
        document.pointerLockElement == document.querySelector("canvas")
      ) {
        this.createShape();
      }
    });
  },
  tick: function() {
    this.getData();
  },
  getData: function () {
    color = $("#color-picker").val();
    scale = $("#scale-inp").val();
    rotation = $("#rotate-inp").val();
    $(".shape").click(function () {
      $(".shape").attr("selected", false);
      $(this).attr("selected", true);
      shape = $(this).attr("alt");
    });
  },
  createShape: function () {
    let shapeEl = document.createElement(`a-${shape}`);
    this.shapeCount++;

    let pos = new THREE.Vector3();
    this.el.object3D.getWorldPosition(pos);
    shapeEl.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z });
    shapeEl.setAttribute("scale", scale);
    shapeEl.setAttribute("rotation", rotation);
    shapeEl.setAttribute("color", color);
    shapeEl.setAttribute("grab", "");
    $("a-scene").append(shapeEl);
  },
});
