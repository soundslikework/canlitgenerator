var canGen = {};
canGen.flickrKey = 'fdf547fa76003a11e48d4021845180fb';
canGen.flickrUser = '138489272@N04';
canGen.titleId = "";
canGen.finalUrl = "";
canGen.secretId = "";
canGen.userId = "";
canGen.serverId = "";
canGen.photoId = "";
canGen.farmId = "";
canGen.random = 0;
canGen.userName = "";

canGen.buttonPress = function() {
	$('.again').on('click', function(e) {
	e.preventDefault;
	canGen.generate();
	});
};

canGen.getPhoto = function(){
	$.ajax({
		url: 'https://api.flickr.com/services/rest/',
		method: 'GET',
		// async: false,
		dataType: 'json',
		data: {
			method: 'flickr.favorites.getList',
			api_key: canGen.flickrKey,
			user_id: canGen.flickrUser,
			format: 'json',
			nojsoncallback: 1
		}
	}).then(function(data){
		console.log(data);
	canGen.random = _.random(0,(data.photos.photo.length-1));
	canGen.farmId = data.photos.photo[canGen.random].farm;
	canGen.photoId = data.photos.photo[canGen.random].id;
	canGen.serverId = data.photos.photo[canGen.random].server;
	canGen.userId = data.photos.photo[canGen.random].owner;
	canGen.secretId = data.photos.photo[canGen.random].secret;
	canGen.finalUrl = 'http://farm' + canGen.farmId + '.static.flickr.com/' + canGen.serverId + '/' + canGen.photoId + '_' + canGen.secretId + '_b.jpg';
	canGen.titleId = data.photos.photo[canGen.random].title;
	$('.backgroundContainer').css('background-image', 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(' + canGen.finalUrl + ')');
	}).then(function(){
	canGen.getCredit();

	});
};

canGen.getCredit = function(){
	$.ajax({
		url: 'https://api.flickr.com/services/rest/',
		method: 'GET',
		dataType: 'json',
		data: {
			method: 'flickr.people.getInfo',
			api_key: canGen.flickrKey,
			user_id: canGen.userId,
			format: 'json',
			nojsoncallback: 1
		}
	}).then(function(resp){
		canGen.userName = resp.person.username._content;
		$('.right p').html('Background: <a href="https://www.flickr.com/photos/' + canGen.userId + '/' + canGen.photoId + '">' + canGen.titleId + ' by '+ canGen.userName +'</a>');
	});
};

canGen.generate = function() {
	//controls single or multiple protagonists
	var choice = _.random(1);

	//controls 'terse' string
	var terStr = 0;
	var terseRand = _.random(10);

	//controls 'mode of transportation'
	var modeRand = _.random(10);

		if (terseRand > 8) {
			terStr = _.sample(options[choice][4]);
		} else {
			terStr = options[choice][4][0];
		}

		if (modeRand > 6) {
			modStr = _.sample(options[choice][3]);
		} else {
			modStr = options[choice][3][0];
		}

		proStr = _.sample(options[choice][0]);
		actStr = _.sample(options[choice][1]);
		reaStr = _.sample(options[choice][2]);

		var nameString = proStr.concat(terStr, actStr, modStr, reaStr);
		var tweetString = nameString.replace(/ /g, "%20");

		console.log(nameString);
		console.log(tweetString);

		$('.content p').html(nameString);
		$('.tweetButton a').attr("href","https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&text=" + tweetString + "%20#canlitpremgen&tw_p=tweetbutton&url=http://www.canlitgenerator.com");
};

$(document).ready(function() {
	canGen.buttonPress();
	canGen.getPhoto();
	canGen.generate();
	});
