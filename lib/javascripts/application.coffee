class Calendar
	@monthOffsets
	@yearOffsets
	
	constructor:(month, year)->
		@dayLabels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun']
		@monthLabels = ['January', 'February', 'March', 'April',
												 'May', 'June', 'July', 'August', 'September',
												 'October', 'November', 'December']
		@daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
			
	scrollTo:(date)=>
		console.log 'scroll to' + date
	
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


$ ->
	calendar = new Calendar()
	calendar.setupScrollBars()