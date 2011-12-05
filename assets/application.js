(function() {
  var Calendar;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Calendar = (function() {

    Calendar.monthOffsets;

    Calendar.yearOffsets;

    function Calendar(month, year) {
      this.monthScrollDidStart = __bind(this.monthScrollDidStart, this);
      this.monthScrollDidDrag = __bind(this.monthScrollDidDrag, this);
      this.monthScrollDidStop = __bind(this.monthScrollDidStop, this);
      this.yearScrollDidStart = __bind(this.yearScrollDidStart, this);
      this.yearScrollDidDrag = __bind(this.yearScrollDidDrag, this);
      this.yearScrollDidStop = __bind(this.yearScrollDidStop, this);
      this.scrollTo = __bind(this.scrollTo, this);      this.dayLabels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
      this.monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    Calendar.prototype.setupScrollBars = function() {
      $("#draggable-month").draggable({
        snap: ".scroll-bar#month",
        axis: 'y',
        start: this.monthScrollDidStart,
        stop: this.monthScrollDidStop,
        drag: this.monthScrollDidDrag,
        opacity: 0.70
      });
      return $("#draggable-year").draggable({
        snap: ".scroll-bar#year",
        axis: 'y',
        start: this.yearScrollDidStart,
        stop: this.monthScrollDidStop,
        drag: this.yearScrollDidDrag,
        opacity: 0.70
      });
    };

    Calendar.prototype.getMonthOffsets = function() {
      var month, _i, _len, _ref, _results;
      _ref = this.monthLabels;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        month = _ref[_i];
        _results.push(this.monthOffsets.push($("[month=" + month + "]").offset()));
      }
      return _results;
    };

    Calendar.prototype.scrollTo = function(date) {
      return console.log('scroll to' + date);
    };

    Calendar.prototype.yearScrollDidStop = function(event, ui) {
      return console.log('yearScrollDidStop');
    };

    Calendar.prototype.yearScrollDidDrag = function(event, ui) {
      return console.log('yearScrollDidStop');
    };

    Calendar.prototype.yearScrollDidStart = function(event, ui) {
      return console.log('yearScrollDidStop');
    };

    Calendar.prototype.monthScrollDidStop = function(event, ui) {
      return console.log('monthScrollDidStop');
    };

    Calendar.prototype.monthScrollDidDrag = function(event, ui) {
      return console.log('monthScrollIsScrolling');
    };

    Calendar.prototype.monthScrollDidStart = function(event, ui) {
      return console.log('monthScrollDidStart');
    };

    Calendar.prototype.isOverlapping = function(elem, offset) {
      var h, l, maxx, maxy, t, w;
      offset = $(elem).offset();
      l = offset.left;
      t = offset.top;
      h = elem.height();
      w = elem.width();
      maxx = l + w;
      maxy = t + h;
      return (offset.y <= maxy && offset.y >= t) && (offset.x <= maxx && offset.x >= l);
    };

    Calendar.prototype.checkForLeapYear = function() {
      if (this.month === 1) {
        if ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) {
          return true;
        }
      }
    };

    return Calendar;

  })();

  $(function() {
    var calendar;
    calendar = new Calendar();
    return calendar.setupScrollBars();
  });

}).call(this);
