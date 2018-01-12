jQuery(document).ready( function ($) {
	console.log(media);
	// class MediaItem {
	// 	constructor(id, title, author, genre, publisher, imageURL, rating) {

	// 	}
	// }

	class MediaList {
		constructor (medialist, wrapper) {
			this.medialist = medialist;
			this.wrapper = wrapper;
			this.displayMedia(medialist);
		}
		//fill HTML Template with data from medialist
		itemTemplate (id, title, author, genre, publisher, imageURL, rating, category) {
			var tpl = `
				<div class="col-lg-3 col-md-4 col-sm-6 media-item" data-id="${id}">
            		<div class="media">
					  <div class="media-left">
					      <img class="media-object" src="${imageURL}" alt="Media Thumbnail">
					  </div>
					  <div class="media-body">
					    <h4 class="media-heading">${title}</h4>
					    <h6>by ${author} | published by ${publisher}</h6>
					    <span class="label label-default">${category}</span>
					    <span class="label label-default">${genre}</span>

					  </div>
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
	}

	//create instance of MediaList
	var medialist = new MediaList(media["Items"], $(".media-container"));
});