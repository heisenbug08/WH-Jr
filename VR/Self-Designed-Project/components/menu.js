let menuVis = false;
let canvasEl, reach, camPos;

AFRAME.registerComponent("menu", {
  shapeCount: 0,
  init: function () {
    canvasEl = document.querySelector("canvas");
    $(window).keypress((e) => {
      if (e.which == 109) {
        this.toggleMenu();
      }
    });
    $("#flight-switch").prop("checked", true);
  },
  tick: function () {
    if ($("#flight-switch").prop("checked")) {
      $("a-camera").attr("wasd-controls", "fly: true");
    } else {
      $("a-camera").attr("wasd-controls", "fly: false");
    }
    camPos = $("a-camera").attr("position");
    $("#pos-pre").html(
      `Position: ${Math.round(camPos.x * 10) / 10}, ${Math.round((camPos.y - 1.6) * 10) / 10}, ${Math.round(camPos.z * 10) / 10}`
    );
    reach = $("#reach-slider").val();
    $("#reach-label").html(`Reach: ${reach}`)
    $("#grab").attr("position", `0 0 -${reach}`);
  },
  toggleMenu: function () {
    if (!menuVis) {
      menuVis = true;
      $("#shape-menu").show();
      document.exitPointerLock();
    } else {
      menuVis = false;
      $("#shape-menu").hide();
      canvasEl.requestPointerLock();
    }
  },
});