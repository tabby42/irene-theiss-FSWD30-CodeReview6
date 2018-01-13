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
				<div class="col-lg-3 col-md-4 col-sm-6 media-item" data-id="${id}">
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

		validateValue (prop) {
			if (prop !== "" && prop !== null && prop !== undefined) {
				if (prop === "Danielle Steel" || prop === "Roland Emmerich") {
					return -1;
				}
				return true;
			} else {
				return false;
			}
		}
	}

	//create instance of MediaList
	var medialist = new MediaList(media["Items"], $(".media-container"));

	//variables for form inputs
	var inputTitle = $("#title"),
		inputAuthor = $("#author"),
		inputPub = $("#publisher"),
		inputCat = $("#category"),
		inputGenre = $("#genre"),
		inputRating = $("#rating"),
		inputImg = $("#thumbnail"),
		inputlist = [inputTitle, inputAuthor, inputPub, inputCat, inputGenre, inputRating, inputImg];

	//process form data
	$("#saveData").on("click", function() {
		// var filePath = "img/" + inputImg.val().split('\\').pop();
		//add new item with dummy image, since project is not on a webserver
		//and image cannot be uploaded
		if (checkInputOnSave()) {
			//add new media item to list
			medialist.addMedia(inputAuthor.val(), inputCat.val(),
				inputGenre.val(), "img/dummyImg.png", inputPub.val(), 
				parseInt(inputRating.val()), inputTitle.val());
			console.log(medialist);
			//hide error message if visible
			if (!$(".bg-danger").hasClass("hidden")) {
				$(".bg-danger").addClass("hidden");
			}
			//update display
			medialist.displayMedia(medialist.medialist);
		} else {
			$(".bg-danger.normal-danger").removeClass("hidden");
		}
	});

	//check text input on blur
	$("input[type='text']").on("blur", function () {
		//validate input and give feedback to user
		if (medialist.validateValue($(this).val()) === true) {
			caseSuccess($(this));
			if (!$(".bg-danger.special-danger").hasClass("hidden")) {
				$(".bg-danger.special-danger").addClass("hidden");
			}
		} else if (medialist.validateValue($(this).val()) === -1) {
			//handle special case of Danielle Steel or Roland Emmerich
			$(".bg-danger.special-danger").removeClass("hidden");
			$(this).parent().addClass("has-error");
			$(this).parent().find(".glyphicon-remove").removeClass("hidden");
		} else {
			caseError($(this));
		}
	});

	//check number input on blur
	$("input[type='number']").on("blur", function () {
		var value = parseInt($(this).val());
		//validate input and give feedback to user
		if (value !== NaN && value >= 1 && value <= 5) {
			caseSuccess($(this));
		} else {
			caseError($(this));
		}
	});

	//reset form
	$("#reset").on("click", function() {
		//empty input fields
		for (var i = 0; i < inputlist.length; i++) {
			inputlist[i].val("");
		}
		//remove feedback
		$(".form-group").removeClass("has-error").removeClass("has-success").find(".glyphicon").addClass("hidden");
	});

	function checkInputOnSave () {
		//check again if all input fields have been filled
		if ( inputAuthor.val() !== "" && inputAuthor.val() !== "Danielle Steel" 
			&& inputAuthor.val() !== "Roland Emmerich" && inputGenre.val() !== "" && inputPub.val() !== ""
			&& inputRating.val() !== ""  && inputTitle.val() !== "" 
			&& inputCat.val() !== "..." && inputCat.val() !== null) {
			return true;
		} else {
			return false;
		}
	}

	//helpers for input validation feedback
	function caseSuccess (elem) {
		elem.parent().removeClass("has-error");
		elem.parent().find(".glyphicon-remove").addClass("hidden");
		elem.parent().addClass("has-success");
		elem.parent().find(".glyphicon-ok").removeClass("hidden");
	}

	function caseError (elem) {
		elem.parent().removeClass("has-success");
		elem.parent().find(".glyphicon-ok").addClass("hidden");
		elem.parent().addClass("has-error");
		elem.parent().find(".glyphicon-remove").removeClass("hidden");
	}
});