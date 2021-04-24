CLIENT_ID = 'ae8f1fc90de04911bfc2ebf5465104ed';
CLIENT_SECRET = '493c92764d534257927d6bf6f1b654a7';


const form = document.getElementById( "genreForm" );


class Album {
    constructor(album_name, artist_name, release_date, spotify_link){
        this.album_name = album_name;
        this.artist_name = artist_name;
        this.release_date = release_date;
        this.spotify_link = spotify_link;
    }
}

function spotify_authorization_request_callback(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    
    xhr.setRequestHeader("Authorization", "Basic YWU4ZjFmYzkwZGUwNDkxMWJmYzJlYmY1NDY1MTA0ZWQ6NDkzYzkyNzY0ZDUzNDI1NzkyN2Q2YmY2ZjFiNjU0YTc");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
       if (xhr.readyState === 4) {
           if(typeof callback === "function") {
                console.log(xhr.status);
                console.log('Object, ', xhr.responseText);
                callback.apply(xhr);
           }
       }
    }

    var data = "grant_type=client_credentials";
    
    xhr.send(data);


}


function spotify_api_request(access_token, genre){
    
    var url = "https://api.spotify.com/v1/recommendations?limit=10&market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=" + genre + "&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + access_token + "");
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
          console.log(xhr.status);
          var spotify_object = JSON.parse(xhr.responseText)
          console.log('SPOTIFY, ', spotify_object.tracks);
          const newItem = document.createElement('ol');

          newItem.innerHTML = 
          '<ol><li>' + spotify_object.tracks[0].album.name + ' by ' + spotify_object.tracks[0].artists[0].name + ' (Listen here: <a>' +  spotify_object.tracks[0].external_urls.spotify + '</a>)!' + 
          '</li><li>' + spotify_object.tracks[1].album.name + ' by ' + spotify_object.tracks[1].artists[0].name + ' (Listen here: <a>' +  spotify_object.tracks[1].external_urls.spotify + '</a>)!' + 
          '</li><li>' + spotify_object.tracks[2].album.name + ' by ' + spotify_object.tracks[2].artists[0].name + ' (Listen here: <a>' +  spotify_object.tracks[2].external_urls.spotify + '</a>)!' + 
          '</li><li>' + spotify_object.tracks[3].album.name + ' by ' + spotify_object.tracks[3].artists[0].name + ' (Listen here: <a>' +  spotify_object.tracks[3].external_urls.spotify + '</a>)!' + 
          '</li><li>' + spotify_object.tracks[4].album.name + ' by ' + spotify_object.tracks[4].artists[0].name + ' (Listen here: <a>' +  spotify_object.tracks[4].external_urls.spotify + '</a>)!' + 
          '</li><li>' + spotify_object.tracks[5].album.name + ' by ' + spotify_object.tracks[5].artists[0].name + ' (Listen here: <a>' +  spotify_object.tracks[5].external_urls.spotify + '</a>)!' + 
          '</li><li>' + spotify_object.tracks[6].album.name + ' by ' + spotify_object.tracks[6].artists[0].name + ' (Listen here: <a>' +  spotify_object.tracks[6].external_urls.spotify + '</a>)!' + 
          '</li><li>' + spotify_object.tracks[7].album.name + ' by ' + spotify_object.tracks[7].artists[0].name + ' (Listen here: <a>' +  spotify_object.tracks[7].external_urls.spotify + '</a>)!' + 
          '</li><li>' + spotify_object.tracks[8].album.name + ' by ' + spotify_object.tracks[8].artists[0].name + ' (Listen here: <a>' +  spotify_object.tracks[8].external_urls.spotify + '</a>)!' + 
          '</li><li>' + spotify_object.tracks[9].album.name + ' by ' + spotify_object.tracks[9].artists[0].name + ' (Listen here: <a>' +  spotify_object.tracks[0].external_urls.spotify + '</a>)!' + 
          '</li></ol>';

          form.parentNode.replaceChild(newItem, form);

       }};
    
    xhr.send();
    

}

form.addEventListener( "submit", function(event) {
    event.preventDefault();

    var dropdown = document.getElementById("genreDropdown");
    var genre_choice = dropdown.value;
    console.log('RESPONSE: ', genre_choice)


    var url = "https://accounts.spotify.com/api/token";
    spotify_authorization_request_callback(url, function () {
        var text  = this.responseText;
        var tokenText = text.split(':')[1];
        var token = tokenText.split('"')[1];

        console.log('TOKEN ', token);

        var albums = spotify_api_request(token, genre_choice);

        console.log('IDK, ', albums);


    });



});
