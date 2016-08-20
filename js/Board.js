var board = {
	name: 'Tablica Kanban',
	numberOfColumnArray : [],
	element: $('#board .column-container'),
	createColumn: function(column) {
		// this.element.innerWidth('1200');
		this.element.append(column.element);
		// this.numberOfColumnArray.push(column.element);
		// this.numberOfColumnArray.forEach(function(ele, index) {
		//
		// 	ele.outerWidth( board.element.innerWidth() / board.element.children().length );
		//
		// });

		initSortable();
	},
};


	$('.add-column').click(function() {
		var columnName = $('.column-name-input').val();
		$.ajax({
    		url: baseUrl + '/column',
    		method: 'POST',
    		data: {
            	name: columnName
    		},
    		success: function(response) {
    			var column = new Column(response.id, columnName);
    			board.createColumn(column);
					$('.column-name').removeClass('is-down');
        }
    });
	});

function initSortable() {
	$('.card-list').sortable({
		connectWith: '.card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}
