function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">Remove Column</button>');
		var columnAddCard = $('<button class="column-add-card">Add Card</button>');
		var wrapperForCardName = $('<div>', {
			'class': "wrapper-for-name"
		});

		var cardNameInput = $('<input>', {
			'class': 'card-name-input',
			name: 'getColumnName',
			type: 'text',
			id: 'column-name',
			value: ''
		}).appendTo(wrapperForCardName);

		var aproveCardNameBtn = $('<span>', {
			'class': 'approve-card'
		}).html($( '<i class="fa fa-plus" aria-hidden="true"></i>') );

		aproveCardNameBtn.appendTo(wrapperForCardName);

		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			$.ajax({
      			url: baseUrl + '/column/' + self.id,
      			method: 'DELETE',
      			success: function(response){
        			self.deleteColumn();
      			}
    		});
		});

		columnAddCard.click(function(event) {
			wrapperForCardName.toggleClass('is-slide');
		});

		aproveCardNameBtn.on('click', function(event) {
			var cardName = cardNameInput.val();

			if(cardName) {
				$.ajax({
	    			url: baseUrl + '/card',
	    			method: 'POST',
	    			data: {
	    				name: cardName,
	    					bootcamp_kanban_column_id: self.id
	    			},
	    			success: function(response) {
	        			var card = new Card(response.id, cardName);
	        			self.createCard(card);
								wrapperForCardName.removeClass('is-slide');
	    			}
				});
			};

		});
		

			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList)
			.append(wrapperForCardName);
			return column;
		}
	}


Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},

	deleteColumn: function() {
	  var self = this;
	  self.element.remove();
		var allColumns = columnContainer.children();
	}
};
