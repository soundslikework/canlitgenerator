$(document).ready(function() {
	
//GET BACKGROUND IMAGE AND OWNER FROM FAVORITES LIST 	
$.getJSON('https://api.flickr.com/services/rest/?method=flickr.favorites.getList&api_key=fdf547fa76003a11e48d4021845180fb&user_id=138489272%40N04&format=json&nojsoncallback=1', function( data ) {
	console.log(data);
	var randomBG = (Math.floor(Math.random() * data.photos.photo.length));
	var farmId = data.photos.photo[randomBG].farm;
	var photoId = data.photos.photo[randomBG].id;
	var serverId = data.photos.photo[randomBG].server;
	var userId = data.photos.photo[randomBG].owner;
	var secretId = data.photos.photo[randomBG].secret;
	var finalUrl = 'http://farm' + farmId + '.static.flickr.com/' + serverId + '/' + photoId + '_' + secretId + '_b.jpg';
	var titleId = data.photos.photo[randomBG].title;
$.getJSON("https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=fdf547fa76003a11e48d4021845180fb&user_id=" + userId + "&format=json&nojsoncallback=1", function (dota) {
	console.log(dota);
	var userName = dota.person.username._content;
	$('.right p').html('Background: <a href="https://www.flickr.com/photos/' + userId + '/' + photoId + '">' + titleId + ' by '+ userName +'</a>');
});
	$('.backgroundContainer').css('background-image','url(' + finalUrl + ')');
}); //END BACKGROUND FUNCTION

//BEGIN TEXT GENERATOR
var protagonist = "";
var tersley = "";
var action = "";
var transpo = "";
var mode = "";
var coins = [];

function coinFinder() {
	var choice = Math.floor((Math.random() * options.length));
	for (var i = 0; i < options[0].length; i++) {
		coins[i] = Math.floor((Math.random() * options[choice][i].length));
	}
	console.log("coins are " +coins);
	
	//RANDOM FUNCTION FOR 'TERSELY' PIECE
	var coinE = Math.floor((Math.random() * 10));
		if (coinE > 8) {
			var coinEB = coins[4];
		} else {
			coinEB = 0;
		}
	
	//RANDOM FUNCTION FOR 'MODE' PIECE
	var coinDA = Math.floor((Math.random() * 10));
	console.log("coinDA was " +coinDA);
	
	//SIX OUT OF TEN TIMES, MODE WILL BE THE EMPTY STRING AT INDEX 0.
		if (coinDA > 6) {
			var coinDB = coins[3];
		} else {
			coinDB = 0;
		}

	//FINAL ASSIGNMENT
		protagonist = options[choice][0][coins[0]];
		action = options[choice][1][coins[1]];
		reason = options[choice][2][coins[2]];
		mode = options[choice][3][coinDB];
		tersely = options[choice][4][coinEB];

		var nameString = protagonist.concat(tersely, action, mode, reason)
		var tweetString = nameString.replace(/ /g, "%20");

		console.log(nameString);
		console.log(tweetString);
		if (nameString.length > 200) {
			$('.content p').css('font-size','2rem');
		} else {
			$('.content p').css('font-size','2.5rem');
		};
		$('.content p').html(nameString);
		$('.tweetButton a').attr("href","https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&text=" + tweetString + "%20#canlitpremgen&tw_p=tweetbutton&url=http://www.canlitgenerator.com");
} //END COINFINDER FUNCTION DECLARATION
//a href="https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&text=" + tweetString + "&tw_p=tweetbutton&url=file%3A%2F%2F%2FUsers%2Fadambrady%2FSites%2FHackeryou%2Fweek4%2Fcanlit%2FCanLitPremiseGenerator.html&via=soundslikework"
//a href="https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&text=Check%20out%20the%20CanLit%20Premise%20Generator!&tw_p=tweetbutton&url=file%3A%2F%2F%2FUsers%2Fadambrady%2FSites%2FHackeryou%2Fweek4%2Fcanlit%2FCanLitPremiseGenerator.html&via=soundslikework"

coinFinder();

//RERUN COINFINDER WHEN BUTTON IS CLICKED
$('.again').on('click', function(e) {
	e.preventDefault;
	coinFinder();
});//END RERUN
})//END DOC READY