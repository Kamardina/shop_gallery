$(document).ready(function() {
  elements = {
    gallery: $(".gallery"),
    galleryPic: $(".gallery img"),
    view: $(".view"),
    viewPic: $(".view img"),
    viewBlock: $(".view_block"),
    zoom: $(".zoom"),
    zoomPic: $(".zoom img")
  };
  zoomBlockSize = {
    width: elements.view.width() / 2,
    height: elements.view.height() / 2
  };

  viewSize = {
    width: elements.view.width(),
    height: elements.view.height()
  };

  viewCoord = {
    x1: elements.view.offset().left,
    x2: elements.view.offset().left + viewSize.width,
    y1: elements.view.offset().top,
    y2: elements.view.offset().top + viewSize.height
  };
  console.log(viewCoord);
  elements.viewBlock.css(zoomBlockSize);

  elements.viewBlock.hide();
  elements.zoom.hide();

  elements.galleryPic.click(function() {
    url = $(this).attr("src");
    elements.viewPic
      .fadeOut(300, function() {
        $(this).attr("src", url);
      })
      .fadeIn(300);
  });
  elements.view.hover(
    function() {
      url = $(this)
        .find("img")
        .attr("src");

      elements.zoomPic.attr("src", url);
      elements.zoom.show();
      elements.viewBlock.show();
    },
    function() {
      elements.zoom.hide();
      elements.viewBlock.removeAttr("style");
      elements.viewBlock.css(zoomBlockSize);
      elements.viewBlock.hide();
    }
  );

  elements.view.mousemove(function(e) {
    coordinateMouse = {
      left: e.pageX,
      top: e.pageY
    };
    coordinateBlock = {
      left: coordinateMouse.left - viewCoord.x1,
      top: coordinateMouse.top - viewCoord.y1
    };

    viewBlockCoord = {
      x1: coordinateMouse.left - zoomBlockSize.width / 2,
      x2: coordinateMouse.left + zoomBlockSize.width / 2,
      y1: coordinateMouse.top - zoomBlockSize.height / 2,
      y2: coordinateMouse.top + zoomBlockSize.height / 2
    };
    coordinatePic = {
      left: -coordinateMouse.left + viewCoord.x1,
      top: -coordinateMouse.top + viewCoord.y1 - zoomBlockSize.height / 2
    };

    if (
      viewBlockCoord.x1 >= viewCoord.x1 &&
      viewBlockCoord.x2 <= viewCoord.x2
    ) {
      elements.viewBlock.css("left", coordinateBlock.left);
      elements.zoomPic.css("left", coordinatePic.left);
    }
    if (
      viewBlockCoord.y1 >= viewCoord.y1 &&
      viewBlockCoord.y2 <= viewCoord.y2
    ) {
      elements.viewBlock.css("top", coordinateBlock.top);
      elements.zoomPic.css("top", coordinatePic.top);
    }
  });
});
