jQuery(document).ready( function ($) {
	//console.log(media);
	class MediaItem {
		constructor(author, category, genre, imageURL, publisher, rating, title, medialist) {
			this.title = title;
			this.author = author;
			this.genre = genre;
			this.publisher = publisher;
			this.image = imageURL;
			this.rating = rating;
			this.category = category;
			this.createId(medialist);
		}

		createId (mediaArray) {
			this.id = mediaArray.length + 1;
		}
	}

	class MediaList {
		constructor (medialist, wrapper) {
			this.medialist = medialist;
			this.wrapper = wrapper;
			this.displayMedia(medialist);
		}

		itemTemplate (id, title, author, genre, publisher, imageURL, rating, category) {
			//fill HTML Template with data from medialist
			var tpl = `
				<div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 media-item" data-id="${id}">
            		<div class="media">
					  <div class="media-center">
					      <img class="media-object thumbnail" src="${imageURL}" alt="Media Thumbnail">
					  </div>
					  <div class="media-body text-center">
					  <h4 class="media-heading text-uppercase">${title}</h4>
					    <h6>by <span class="italic">${author}</span> | published by <span class="italic">${publisher}<span></h6>
					    <span class="label label-primary">${category}</span>
					    <span class="label label-info">${genre}</span>
					    <div class="rating">`;
					    for (var i = 0; i < rating; i++) {
					    	tpl += `<span class="glyphicon glyphicon-star" aria-hidden="true"></span>`
				    	}
					    for (var i = 0; i < 5 - rating; i++) {
					    	tpl += `<span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>`
					    }
					tpl += `</div></div>
					</div>
        		</div>
			`;
			//console.log(tpl);
			return $(tpl);
		}

		displayMedia (mediaArray) {
			var toAppend = "";
			this.wrapper.empty();
			//loop through all items of medialist, call template-function on each iteration
			//fill with data and append to container-element
			for (var i = 0; i < mediaArray.length; i++) {
				toAppend = this.itemTemplate(mediaArray[i].id, 
					mediaArray[i].title, mediaArray[i].author, 
					mediaArray[i].genre, mediaArray[i].publisher, 
					mediaArray[i].image, mediaArray[i].rating, mediaArray[i].category);
				this.wrapper.append(toAppend);
			}
		}

		addMedia (author, category, genre, imageURL, publisher, rating, title) {
			//create new MediaItem and add it to list
			var newItem = new MediaItem(author, category, genre, imageURL, 
				publisher, rating, title, this.medialist);
			this.medialist.push(newItem);
		}
	}

	//variables for form inputs
	var inputTitle = $("#title"),
		inputAuthor = $("#author"),
		inputPub = $("#publisher"),
		inputCat = $("#category"),
		inputGenre = $("#genre"),
		inputRating = $("#rating"),
		inputImg = $("#thumbnail"),
		inputlist = [inputTitle, inputAuthor, inputPub, inputCat, inputGenre, inputRating, inputImg];


	//create instance of MediaList
	var medialist = new MediaList(media["Items"], $(".media-container"));

	//process form data
	$("#saveData").on("click", function() {
		// var filePath = "img/" + inputImg.val().split('\\').pop();
		//add new item with dummy image, since project is not on a webserver
		//TODO: save image in localStorage?
		if (checkInput()) {
			//add new media item to list
			medialist.addMedia(inputAuthor.val(), inputCat.val(),
				inputGenre.val(), "img/dummyImg.png", inputPub.val(), 
				parseInt(inputRating.val()), inputTitle.val());
			console.log(medialist);
			//update display
			medialist.displayMedia(medialist.medialist);
			
		} else {
			//alert("check input");
		}
	});

	$("#reset").on("click", function() {
		//empty input fields
		for (var i = 0; i < inputlist.length; i++) {
			inputlist[i].val("");
		}
	});

	function checkInput () {
		//check if input fields have been filled
		if ( inputAuthor.val() !== "" && inputGenre.val() !== "" && inputPub.val() !== ""
			&& inputRating.val() !== ""  && inputTitle.val() !== "" 
			&& inputCat.val() !== "..." && inputCat.val() !== null) {
			$(".form-group").removeClass("has-error");
			$(".form-group").addClass("has-success");
			return true;
		} else {
			$(".form-group").addClass("has-error");
			return false;
		}
	}


});