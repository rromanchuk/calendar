class Calendar
	@monthOffsets
	@yearOffsets
	@currentDate
	@month
	@year
	@firstDay
	constructor:(month, year)->
		@currentDate = new Date()
		@month = month ? @currentDate.getMonth()
		@year = year ? @currentDate.getFullYear()
		@dayLabels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun']
		@monthLabels = ['January', 'February', 'March', 'April',
												 'May', 'June', 'July', 'August', 'September',
												 'October', 'November', 'December']
		@daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		@firstDay = new Date(@year, @month, 1).getDay();

	setupScrollBars:->
		$( "#draggable-month" ).draggable 
			snap: ".scroll-bar#month"
			axis: 'y'
			start: @monthScrollDidStart
			stop: @monthScrollDidStop
			drag: @monthScrollDidDrag
			opacity: 0.70
		
		$( "#draggable-year" ).draggable
			snap: ".scroll-bar#year"
			axis: 'y'
			start: @yearScrollDidStart
			stop: @monthScrollDidStop
			drag: @yearScrollDidDrag
			opacity: 0.70
		
	
	getMonthOffsets:->
		for month in @monthLabels
			@monthOffsets.push $("[month=#{month}]").offset()
			
	scrollTo:(date)->
		offset = $("table[month='#{date.month}'][year='#{date.year}']").offset()
		$('.calendar').scrollTop(offset.top - 200)
	
	yearScrollDidStop:(event, ui)=>
		console.log 'yearScrollDidStop'
		
		
	yearScrollDidDrag:(event, ui)=>
		console.log 'yearScrollDidStop'

	yearScrollDidStart:(event, ui)=>
		console.log 'yearScrollDidStop'
	
	monthScrollDidStop:(event, ui)=>
		console.log 'monthScrollDidStop'
	
	monthScrollDidDrag:(event, ui)=>
		console.log 'monthScrollIsScrolling'
		
	monthScrollDidStart:(event, ui)=>
		console.log 'monthScrollDidStart'
		
	isOverlapping: (elem, offset)->
		offset = $(elem).offset();
		l = offset.left
		t = offset.top
		h = elem.height()
		w = elem.width()
		maxx = l + w
		maxy = t + h
		return (offset.y <= maxy && offset.y >= t) && (offset.x <= maxx && offset.x >= l)
		
	checkForLeapYear:->
		if @month == 1
			if ((@year % 4 == 0 && @year % 100 != 0) || @year % 400 == 0)
				return true
	
	scrollToCurrent:->
		offset = $("table[month='#{@month}'][year='#{@year}']").offset()
		$('.calendar').scrollTop(offset.top - 200)
	
	#fixme: just clone dom and update
	buildCalendar:->
		for year in [@year-5..@year+5]
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
							html += day
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
	calendar.setupScrollBars()
	calendar.buildCalendar()
	calendar.scrollToCurrent()