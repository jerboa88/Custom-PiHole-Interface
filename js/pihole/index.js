$(document).ready(function() {
	// Pull in data via AJAX
	updateSummaryData();
	updateQueriesOverTime();
	updateQueryTypes();
	updateTopClientsChart();
	updateForwardDestinations();
	updateTopLists();

	// Create charts
	var chartData = {
		labels: [],
		datasets: [{
			label: "All Queries",
			fillColor: "rgba(0, 166, 90, 0.1)", // rgba(220,220,220,0.5)
			strokeColor: "#00a65a",
			pointColor: "#00a65a"
		},
		{
			label: "Ad Queries",
			fillColor: "rgba(221, 75, 57, 0.5)",
			strokeColor: "#dd4b39",
			pointColor: "#dd4b39"
		}]
	};
	var isMobile = {
		Windows: function() {return /IEMobile/i.test(navigator.userAgent);},
		Android: function() {return /Android/i.test(navigator.userAgent);},
		BlackBerry: function() {return /BlackBerry/i.test(navigator.userAgent);},
		iOS: function() {return /iPhone|iPad|iPod/i.test(navigator.userAgent);},
		any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());}
	};
	var animate = false;
	var ctx = document.getElementById("queryOverTimeChart").getContext("2d");
	timeLineChart = new Chart(ctx).Line(chartData, {
		pointDot : false,
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
		animation : animate
	});

	ctx = document.getElementById("queryTypeChart").getContext("2d");
	queryTypeChart = new Chart(ctx).Doughnut([], {
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].strokeColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
		animation : animate
	});

	ctx = document.getElementById("forwardDestinationChart").getContext("2d");
	forwardDestinationChart = new Chart(ctx).Doughnut([], {
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].strokeColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
		animation: animate
	});
});

// Functions to update data in page
function updateSummaryData(runOnce) {
	$.getJSON("api.php?summary", function LoadSummaryData(data) {
		//$("h3.statistic").addClass("glow");
		if ($("h3#ads_blocked_today").text() != data.ads_blocked_today) {$("h3#ads_blocked_today").addClass("glow")}
		if ($("h3#dns_queries_today").text() != data.dns_queries_today) {$("h3#dns_queries_today").addClass("glow")}
		if ($("h3#ads_percentage_today").text() != data.ads_percentage_today) {$("h3#ads_percentage_today").addClass("glow")}

		window.setTimeout(function(){
			$("span#ads_blocked_today").text(data.ads_blocked_today)
			$("span#dns_queries_today").text(data.dns_queries_today)
			$("span#domains_being_blocked").text(data.domains_being_blocked)
			$("span#ads_percentage_today span").text(Math.round(data.ads_percentage_today))
			$("div#ads_percentage_today_progress").css("width", data.ads_percentage_today + "%")
			$("h3.statistic.glow").removeClass("glow")
		}, 500)
	}).done(function() {if (runOnce !== true) {setTimeout(updateSummaryData, 10000)}
	}).fail(function() {if (runOnce !== true) {setTimeout(updateSummaryData, (1000 * 60 * 5))}})
}

function updateQueriesOverTime() {
	$.getJSON("api.php?overTimeData", function(data) {
		for (hour in data.ads_over_time) {timeLineChart.addData([data.domains_over_time[hour], data.ads_over_time[hour]], hour + ":00")}
		$('#queries-over-time .overlay').remove()
		//$('#queries-over-time').append(timeLineChart.generateLegend());
	})
}

function updateTopClientsChart() {
	$.getJSON("api.php?summaryRaw&getQuerySources", function(data) {
		var clienttable =  $('#client-frequency').find('tbody:last');
		for (domain in data.top_sources) {
			clienttable.append('<tr> <td>' + domain +
				'</td> <td>' + data.top_sources[domain] + '</td> <td> <div class="progress progress-sm"> <div class="progress-bar progress-bar-yellow" style="width: ' +
				data.top_sources[domain] / data.dns_queries_today * 100 + '%"></div> </div> </td> </tr> ');
		}

		$('#client-frequency .overlay').remove();
	});
}

function updateQueryTypes() {
	$.getJSON("api.php?getQueryTypes", function(data) {
		var colors = [];
		$.each($.AdminLTE.options.colors, function(key, value) {colors.push(value);});
		$.each(data, function(key, value) {
			queryTypeChart.addData({
				value: value,
				color: colors.shift(),
				label: key.substr(6,key.length - 7)
			});
		});
		$('#query-types .overlay').remove();
		//$('#query-types').append(queryTypeChart.generateLegend());
	});
}

function updateForwardDestinations() {
	$.getJSON("api.php?getForwardDestinations", function(data) {
		var colors = [];
		$.each($.AdminLTE.options.colors, function(key, value) {colors.push(value);});
		$.each(data, function(key, value) {
			forwardDestinationChart.addData({
				value: value,
				color: colors.shift(),
				label: key
			});
		});
		$('#forward-destinations .overlay').remove();
		//$('#forward-destinations').append(forwardDestinationChart.generateLegend());
	});
}

function updateTopLists() {
	$.getJSON("api.php?summaryRaw&topItems", function(data) {
		var domaintable = $('#domain-frequency').find('tbody:last');
		var adtable = $('#ad-frequency').find('tbody:last');

		for (domain in data.top_queries) {
			domaintable.append('<tr> <td>' + domain +
				'</td> <td>' + data.top_queries[domain] + '</td> <td> <div class="progress progress-sm"> <div class="progress-bar progress-bar-light-blue" style="width: ' +
				data.top_queries[domain] / data.dns_queries_today * 100 + '%"></div> </div> </td> </tr> ');
		}
		for (domain in data.top_ads) {
			adtable.append('<tr> <td>' + domain +
				'</td> <td>' + data.top_ads[domain] + '</td> <td> <div class="progress progress-sm"> <div class="progress-bar progress-bar-red" style="width: ' +
				data.top_ads[domain] / data.ads_blocked_today * 100 + '%"></div> </div> </td> </tr> ');
		}

		$('#domain-frequency .overlay').remove();
		$('#ad-frequency .overlay').remove();
	});
}
