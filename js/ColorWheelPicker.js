(function($) {
  $.fn.colorWheelPicker = function(colors) {
    return this.each(function() {
      var jTarget = $(this),
        level = colors.length,
        colorWheel = $('<div class="color-wheel"></div>'),
        fanDegree = 360 / level,
        rotateWheel = function rotateWheel(idx) {
          var start = 360 / level / 2,
            degree = start + 360 / level * idx;
          colorWheel.css('transform', 'rotate(' + -degree + 'deg)');
        },
        changeColor = function changColor(idx) {
          colorWheel.data('color-index', idx);
          rotateWheel(idx);
          jTarget.trigger('change', [colors[idx]]);
        },
        i, fan, fanColor;

      for (i = 0; i < level; i++) {
        fan = $('<div class="color-wheel-fan"></div>');
        fanColor = $('<div class="color-wheel-fan-color"></div>');
        fan.css('transform', 'rotate(' + (fanDegree * (i + 1)) + 'deg)');
        fanColor.css('transform', 'rotate(' + (180 - fanDegree) + 'deg)');
        fanColor.css('background-color', colors[i]);
        fan.append(fanColor).appendTo(colorWheel);
      }

      jTarget.empty().append(colorWheel);
      changeColor(0);
      colorWheel.click(function() {
        var jThis = $(this),
          oIdx = jThis.data('color-index'),
          colorIndex = level - 1 == oIdx ? 0 : oIdx + 1;
        changeColor(colorIndex);
      });
    });
  }
})(jQuery);
