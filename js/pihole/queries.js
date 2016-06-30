$(document).ready(function() {
	tableApi = $('#all-queries').DataTable( {
		rowCallback: function(row, data, index) {
			if (data[4] == 'Blocked') {$(row).css('color', '#dd4b39')}
			else{$(row).css('color', '#00a65a')}

		},
		ajax: 'api.php?getAllQueries',
		autoWidth: false,
		order: [[0, 'desc']],
		columns: [
			{width: '20%', type: 'date'},
			{width: '10%'},
			{width: '40%'},
			{width: '15%'},
			{width: '15%'}
		]
	})
})

function refreshData() {tableApi.ajax.url('api.php?getAllQueries').load()}
