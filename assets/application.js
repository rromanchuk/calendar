(function() {
  var Calendar;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Calendar = (function() {

    Calendar.monthOffsets;

    Calendar.yearOffsets;

    Calendar.currentDate;

    Calendar.month;

    Calendar.year;

    Calendar.firstDay;

    function Calendar(month, year) {
      this.monthScrollDidStart = __bind(this.monthScrollDidStart, this);
      this.monthScrollDidDrag = __bind(this.monthScrollDidDrag, this);
      this.monthScrollDidStop = __bind(this.monthScrollDidStop, this);
      this.yearScrollDidStart = __bind(this.yearScrollDidStart, this);
      this.yearScrollDidDrag = __bind(this.yearScrollDidDrag, this);
      this.yearScrollDidStop = __bind(this.yearScrollDidStop, this);      this.currentDate = new Date();
      this.month = month != null ? month : this.currentDate.getMonth();
      this.year = year != null ? year : this.currentDate.getFullYear();
      this.dayLabels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
      this.monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      this.firstDay = new Date(this.year, this.month, 1).getDay();
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
      var offset;
      offset = $("table[month='" + date.month + "'][year='" + date.year + "']").offset();
      return $('.calendar').scrollTop(offset.top - 200);
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

    Calendar.prototype.scrollToCurrent = function() {
      var offset;
      offset = $("table[month='" + this.month + "'][year='" + this.year + "']").offset();
      return $('.calendar').scrollTop(offset.top - 200);
    };

    Calendar.prototype.buildCalendar = function() {
      var buildWeek, day, html, month, num, year, _ref, _ref2, _results;
      _results = [];
      for (year = _ref = this.year - 5, _ref2 = this.year + 5; _ref <= _ref2 ? year <= _ref2 : year >= _ref2; _ref <= _ref2 ? year++ : year--) {
        _results.push((function() {
          var _i, _len, _ref3, _results2;
          _results2 = [];
          for (month = 0; month <= 11; month++) {
            html = '';
            html += "<table month=\"" + month + "\" year=\"" + year + "\" class=\"zebra-striped\">\n	<caption> " + this.monthLabels[month] + " " + year + " </caption>\n	<thead>\n	<tr>";
            _ref3 = this.dayLabels;
            for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
              day = _ref3[_i];
              html += "<th>" + day + "</th>";
            }
            html += '	</tr>\n</thead>\n<tbody>\n	<tr>';
            buildWeek = true;
            day = 1;
            while (day < this.daysInMonth[month]) {
              for (num = 0; num <= 6; num++) {
                html += "<td>";
                if ((day <= this.daysInMonth[month]) && ((day > 1) || (num >= this.firstDay))) {
                  html += day;
                  day++;
                }
                html += "</td>";
              }
              html += "</tr>";
            }
            html += '</tbody>\n</table>';
            _results2.push($('.calendar').append(html));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    return Calendar;

  })();

  $(function() {
    var calendar;
    calendar = new Calendar();
    calendar.setupScrollBars();
    calendar.buildCalendar();
    return calendar.scrollToCurrent();
  });

}).call(this);
