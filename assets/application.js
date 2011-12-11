(function() {
  var Calendar;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Date.prototype.getDOY = function() {
    var onejan;
    onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((this - onejan) / 86400000);
  };

  Calendar = (function() {

    Calendar.monthOffsets;

    Calendar.yearOffsets;

    Calendar.currentDate;

    Calendar.month;

    Calendar.year;

    Calendar.day;

    Calendar.firstDay;

    function Calendar(month, year) {
      this.monthScrollDidStart = __bind(this.monthScrollDidStart, this);
      this.monthScrollDidDrag = __bind(this.monthScrollDidDrag, this);
      this.monthScrollDidStop = __bind(this.monthScrollDidStop, this);
      this.yearScrollDidStart = __bind(this.yearScrollDidStart, this);
      this.yearScrollDidDrag = __bind(this.yearScrollDidDrag, this);
      this.yearScrollDidStop = __bind(this.yearScrollDidStop, this);
      this.didSelectDate = __bind(this.didSelectDate, this);
      var _i, _ref, _ref2, _results;
      this.currentDate = new Date();
      this.month = month != null ? month : this.currentDate.getMonth();
      this.year = year != null ? year : this.currentDate.getFullYear();
      this.dayLabels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
      this.monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.years = (function() {
        _results = [];
        for (var _i = _ref = this.year - 5, _ref2 = this.year + 5; _ref <= _ref2 ? _i <= _ref2 : _i >= _ref2; _ref <= _ref2 ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
      this.calendarHeight = $('.calendar-container').height();
      this.calendarMidpoint = this.calendarHeight * 0.5;
      this.monthSelectorHeight = $('#draggable-month').height();
      this.monthScrollBarHeight = $('.scroll-bar#month').height() - 20;
      this.monthScaleFactor = this.monthScrollBarHeight / 365;
      this.yearSelectorHeight = $('#draggable-year').height();
      this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      this.firstDay = new Date(this.year, this.month, 1).getDay();
      this.setupScrollBars();
      this.buildCalendar();
      this.registerClicks();
    }

    Calendar.prototype.setupScrollBars = function() {
      $("#draggable-month").draggable({
        snap: ".scroll-bar#month",
        axis: 'y',
        start: this.monthScrollDidStart,
        stop: this.monthScrollDidStop,
        drag: this.monthScrollDidDrag
      });
      return $("#draggable-year").draggable({
        snap: ".scroll-bar#year",
        axis: 'y',
        start: this.yearScrollDidStart,
        stop: this.yearScrollDidStop,
        drag: this.yearScrollDidDrag
      });
    };

    Calendar.prototype.registerClicks = function() {
      return $('table').on('click', 'a', this.didSelectDate);
    };

    Calendar.prototype.scrollToDate = function(date) {
      var day, month, moveTo, offset, scrollPosition, year;
      var _this = this;
      month = date.getMonth();
      year = date.getFullYear();
      day = date.getDate();
      if (this.month !== month || year !== this.year || day !== this.day) {
        scrollPosition = $('.calendar').scrollTop();
        offset = $("a[day='" + day + "'][month='" + month + "'][year='" + year + "']").offset();
        console.log("changing to " + day + "-" + month + "-" + year + " scroll position " + scrollPosition);
        console.log("element is " + offset.top + " from top and cal is " + this.calendarHeight + " tall");
        if (offset.top > this.calendarHeight) {
          moveTo = scrollPosition + (offset.top - this.calendarMidpoint);
        } else {
          moveTo = scrollPosition + (offset.top - this.calendarMidpoint);
        }
        if (!this.animating) {
          this.animating = true;
          $('.calendar').animate({
            scrollTop: moveTo
          }, 'slow', function() {
            _this.animating = false;
            return console.log("animating done");
          });
        }
      }
      this.month = month;
      this.year = year;
      return this.day = day;
    };

    Calendar.prototype.scrollMonthToDate = function(date) {
      var top;
      top = date.getDOY();
      return $('#draggable-month').animate({
        top: top
      }, 'slow');
    };

    Calendar.prototype.didSelectDate = function(event) {
      var date, day, month, year;
      console.log(event);
      day = $(event.currentTarget).attr('day');
      month = $(event.delegateTarget).attr('month');
      year = $(event.delegateTarget).attr('year');
      date = new Date(year, month, day);
      console.log(date);
      this.scrollToDate(date);
      return this.scrollMonthToDate(date);
    };

    Calendar.prototype.yearScrollDidStop = function(event, ui) {
      return console.log('yearScrollDidStop');
    };

    Calendar.prototype.yearScrollDidDrag = function(event, ui) {
      var top;
      top = ui.offset.top;
      console.log(top);
      return console.log(top / 12);
    };

    Calendar.prototype.yearScrollDidStart = function(event, ui) {
      return console.log('yearScrollDidStop');
    };

    Calendar.prototype.monthScrollDidStop = function(event, ui) {
      var date, day, top;
      top = ui.offset.top - 50;
      day = (this.monthSelectorHeight * 0.5) + top;
      date = new Date(this.year, 0, day);
      return this.scrollToDate(date);
    };

    Calendar.prototype.monthScrollDidDrag = function(event, ui) {};

    Calendar.prototype.monthScrollDidStart = function(event, ui) {
      return console.log('monthScrollDidStart');
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

    Calendar.prototype.buildScrollBars = function() {
      var month, year, _i, _j, _len, _len2, _ref, _ref2, _results;
      _ref = this.years;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        year = _ref[_i];
        $('#year ul').append("<li year='" + year + "'>" + year + "</li>");
      }
      _ref2 = this.monthLabels;
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        month = _ref2[_j];
        _results.push($('#month ul').append("<li month='" + month + "'>" + month + "</li>"));
      }
      return _results;
    };

    Calendar.prototype.buildCalendar = function() {
      var buildWeek, day, html, month, num, year, _i, _len, _ref, _results;
      this.buildScrollBars();
      _ref = this.years;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        year = _ref[_i];
        _results.push((function() {
          var _j, _len2, _ref2, _results2;
          _results2 = [];
          for (month = 0; month <= 11; month++) {
            html = '';
            html += "<table month=\"" + month + "\" year=\"" + year + "\" class=\"zebra-striped\">\n	<caption> " + this.monthLabels[month] + " " + year + " </caption>\n	<thead>\n	<tr>";
            _ref2 = this.dayLabels;
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              day = _ref2[_j];
              html += "<th>" + day + "</th>";
            }
            html += '	</tr>\n</thead>\n<tbody>\n	<tr>';
            buildWeek = true;
            day = 1;
            while (day < this.daysInMonth[month]) {
              for (num = 0; num <= 6; num++) {
                html += "<td>";
                if ((day <= this.daysInMonth[month]) && ((day > 1) || (num >= this.firstDay))) {
                  html += ("<a day='" + day + "' month='" + month + "' year='" + year + "' href='#'>") + day + "</a>";
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
    return calendar.scrollToCurrent();
  });

}).call(this);
