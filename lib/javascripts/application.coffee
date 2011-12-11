Date::getDOY = ->
  onejan = new Date(@getFullYear(), 0, 1)
  Math.ceil (this - onejan) / 86400000

class Calendar
	@monthOffsets
	@yearOffsets
	@currentDate
	@month
	@year
	@day
	@firstDay
	constructor:(month, year)->
		@currentDate = new Date()
		@month = month ? @currentDate.getMonth()
		@year = year ? @currentDate.getFullYear()
		@dayLabels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun']
		@monthLabels = ['January', 'February', 'March', 'April',
												 'May', 'June', 'July', 'August', 'September',
												 'October', 'November', 'December']
		
		@years 								= [@year-5..@year+5]
		@calendarHeight 			= $('.calendar-container').height()
		@calendarMidpoint 		= @calendarHeight * 0.5
		
		@monthSelectorHeight 	= $('#draggable-month').height()
		@monthScrollBarHeight = $('.scroll-bar#month').height() - 20
		@monthScaleFactor 		= @monthScrollBarHeight / 365
		
		@yearSelectorHeight = $('#draggable-year').height()
		@daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		@firstDay = new Date(@year, @month, 1).getDay();
		@setupScrollBars()
		@buildCalendar()
		@registerClicks()
	
	setupScrollBars:->
		$( "#draggable-month" ).draggable 
			snap: ".scroll-bar#month"
			axis: 'y'
			start: @monthScrollDidStart
			stop: @monthScrollDidStop
			drag: @monthScrollDidDrag
		
		$( "#draggable-year" ).draggable
			snap: ".scroll-bar#year"
			axis: 'y'
			start: @yearScrollDidStart
			stop: @yearScrollDidStop
			drag: @yearScrollDidDrag
			
	registerClicks:->
		# Just attach to tables and bubble up
		$('table').on 'click', 'a',  @didSelectDate
		
	scrollToDate:(date)->
		month = date.getMonth()
		year = date.getFullYear()
		day = date.getDate(); 
		
		if @month != month or year != @year or day != @day
			scrollPosition = $('.calendar').scrollTop()
			offset = $("a[day='#{day}'][month='#{month}'][year='#{year}']").offset()
			console.log "changing to #{day}-#{month}-#{year} scroll position #{scrollPosition}"
			console.log "element is #{offset.top} from top and cal is #{@calendarHeight} tall"
			if offset.top > @calendarHeight
				moveTo = scrollPosition + (offset.top - @calendarMidpoint)
			else
				moveTo = scrollPosition + (offset.top - @calendarMidpoint)
			
			unless @animating
				@animating = true
				$('.calendar').animate
					scrollTop: moveTo
					,'slow'
					, =>
						@animating = false
						console.log "animating done"
		@month = month
		@year = year
		@day = day
	
	scrollMonthToDate: (date)->
		top = (date.getDOY() - (@monthSelectorHeight * 0.5)) + 50
		console.lot "top is #{top} and days are #{date.getDOY()}"
		$('#draggable-month').animate
			top: top
			, 'slow'
	
	didSelectDate: (event)=>
		console.log event
		day = $(event.currentTarget).attr('day')
		month = $(event.delegateTarget).attr('month')
		year = $(event.delegateTarget).attr('year')
		date = new Date(year, month, day)
		console.log date
		@scrollToDate date
		@scrollMonthToDate date
		
	yearScrollDidStop:(event, ui)=>
		console.log 'yearScrollDidStop'
		
	yearScrollDidDrag:(event, ui)=>
		top = ui.offset.top
		console.log top
		console.log top / 12

	yearScrollDidStart:(event, ui)=>
		console.log 'yearScrollDidStop'
	
	monthScrollDidStop:(event, ui)=>
		top = ui.offset.top - 50
		console.log "top is:" + top
		console.log "center is: " + ((@monthSelectorHeight * 0.5) + top)
		day = ((@monthSelectorHeight * 0.5) + top)
		console.log "scrolled to year #{@year} and day #{day}"
		date = new Date(@year, 0, day)
		@scrollToDate date
		console.log date
	
	monthScrollDidDrag:(event, ui)=>
		# top = ui.offset.top
		# 		console.log "top is:" + top
		# 		console.log "center is: " + ((@monthSelectorHeight * 0.5) + top)
		# 		day = ((@monthSelectorHeight * 0.5) + top)
		# 		console.log "scrolled to year #{@year} and day #{day}"
		# 		date = new Date(@year, 0, day)
		# 		@scrollToDate date
		# 		console.log date
	
	monthScrollDidStart:(event, ui)=>
		console.log 'monthScrollDidStart'
		
	checkForLeapYear:->
		if @month == 1
			if ((@year % 4 == 0 && @year % 100 != 0) || @year % 400 == 0)
				return true
	
	scrollToCurrent:->
		offset = $("table[month='#{@month}'][year='#{@year}']").offset()
		$('.calendar').scrollTop(offset.top - 200)
	
	buildScrollBars:->
		for year in @years
			$('#year ul').append "<li year='#{year}'>#{year}</li>"
		for month in @monthLabels
			$('#month ul').append "<li month='#{month}'>#{month}</li>"
			
	#fixme: just clone dom and update
	buildCalendar:->
		@buildScrollBars()
		for year in @years
			for month in [0..11]
				html = ''
				html += """
				<table month="#{month}" year="#{year}" class="zebra-striped">
					<caption> #{@monthLabels[month]} #{year} </caption>
					<thead>
					<tr>
				"""
				for day in @dayLabels 
					html += "<th>#{day}</th>"
				html += '''
					</tr>
				</thead>
				<tbody>
					<tr>
				'''
				buildWeek = true
				day = 1
				while day < @daysInMonth[month]
					for num in [0..6]
						html += "<td>"
						if (day <= @daysInMonth[month]) and ((day > 1) or (num >= @firstDay))
							html += "<a day='#{day}' month='#{month}' year='#{year}' href='#'>" + day + "</a>"
							day++
						html += "</td>"
					html += "</tr>"
				html += '''
				</tbody>
				</table>
				'''	
				$('.calendar').append html
$ ->
	calendar = new Calendar()
	calendar.scrollToCurrent()