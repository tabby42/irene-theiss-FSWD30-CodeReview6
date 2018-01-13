jQuery(document).ready( function ($) {
	//console.log(media);
	class MediaItem {
		constructor(id, title, author, genre, publisher, imageURL, rating, category, medialist) {
			this.title = title;
			this.author = author;
			this.genre = genre;
			this.publisher = publisher;
			this.image = imageURL;
			this.rating = rating;
			this.category = category;
			createId(medialist);
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
		//fill HTML Template with data from medialist
		itemTemplate (id, title, author, genre, publisher, imageURL, rating, category) {
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
			//loop through all items, call template-function on each iteration
			//fill with data and append to container-element
			for (var i = 0; i < mediaArray.length; i++) {
				toAppend = this.itemTemplate(mediaArray[i].id, 
					mediaArray[i].title, mediaArray[i].author, 
					mediaArray[i].genre, mediaArray[i].publisher, 
					mediaArray[i].image, mediaArray[i].rating, mediaArray[i].category);
				this.wrapper.append(toAppend);
			}
		}

		addMedia () {

		}
	}

	//create instance of MediaList
	var medialist = new MediaList(media["Items"], $(".media-container"));
});