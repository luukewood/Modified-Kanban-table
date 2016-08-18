// OGÓLNA FUNKCJA
$(window).on('load', function() {

    $(".loading").fadeOut();
    $(".loaderPage").delay(1000).fadeOut("slow");

});

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': 11,
  'X-Auth-Token': '8d7ee46aa923999e1c4d8d849a3d44a1'
};
var columnContainer = $('.column-container');
var singleColumn = $('.column');
var columnContainerWidth = $('.column-container').width();
var toggleNameColumnInputBtn = $('.create-column');

toggleNameColumnInputBtn.on('click', function(){
  if(columnContainer.children().length > 3 ) {
    alert('Mozesz dodac tylko 4 columny');
    return;
  }

  $('.column-name').toggleClass('is-down');
});

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
    	setupColumns(response.columns);
    }
});

function setupColumns(columns) {
	columns.forEach(function(column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
	cards.forEach(function(card) {
	    var card = new Card(card.id, card.name, card.kanban_column_id);
	  	col.createCard(card);
  	});
}
