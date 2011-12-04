class Calendar
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
		$( "#draggable-year" ).draggable
			snap: ".scroll-bar#year"
			axis: 'y'
		
	didSelectYear:(event)=>
		console.log 'didSelectYear'
		
	didSelectMonth:(event)=>
		console.log 'didSelectMonth'
		
	checkForLeapYear:->
		if @month == 1
			if ((@year % 4 == 0 && @year % 100 != 0) || @year % 400 == 0)
				return true


$ ->
	calendar = new Calendar()
	calendar.setupScrollBars()