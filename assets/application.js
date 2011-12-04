(function() {
  var Calendar;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Calendar = (function() {

    function Calendar(month, year) {
      this.didSelectMonth = __bind(this.didSelectMonth, this);
      this.didSelectYear = __bind(this.didSelectYear, this);      this.dayLabels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
      this.monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    Calendar.prototype.setupScrollBars = function() {
      $("#draggable-month").draggable({
        snap: ".scroll-bar#month",
        axis: 'y'
      });
      return $("#draggable-year").draggable({
        snap: ".scroll-bar#year",
        axis: 'y'
      });
    };

    Calendar.prototype.didSelectYear = function(event) {
      return console.log('didSelectYear');
    };

    Calendar.prototype.didSelectMonth = function(event) {
      return console.log('didSelectMonth');
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
