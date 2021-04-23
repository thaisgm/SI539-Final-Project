CLIENT_ID = '40ee132aeb5947d3b62bee1cc75e6f47';
CLIENT_SECRET = '55f55ab5bee84a049b9eaae80ca26805';

const form = document.getElementById( "genreForm" );


class Album {
    constructor(album_name, artist_name, release_date, spotify_link){
        this.album_name = album_name;
        this.artist_name = artist_name;
        this.release_date = release_date;
        this.spotify_link = spotify_link;
    }
}

function spotify_authorization_request() {

    redirect_uri = 'https://thaisgm.github.io/SI539-Final-Project/';

    request = "https://accounts.spotify.com/authorize?client_id=" + CLIENT_ID + "&redirect_uri=" + redirect_uri + "&response_type=token";

    fetch(request)
    .then(response => response.json())
    .then(data => console.log(data));

}

/*
function spotify_api_request(access_token, genre){
    headers = {
        'Authorization': 'Bearer {}'.format(access_token)
        }
    
        params = (
            ('seed_genres', genre),
            ('min_energy', '0.4'),
            ('min_popularity', '50'),
            ('market', 'US'),
            ('limit', '10')
        );
    
        get_request = requests.get('https://api.spotify.com/v1/recommendations', headers=headers, params=params);
    
        response_data = json.loads(get_request.content);
    
        var x = 0;
    
        all_albums = [];
    
        while (x < 10) {
            spotify_link = response_data['tracks'][x]['external_urls']['spotify'];
            album_name = response_data['tracks'][x]['album']['name'];
            artist_name = response_data['tracks'][x]['album']['artists'][0]['name'];
            release_date = response_data['tracks'][x]['album']['release_date'];
            new_album = Album(album_name, artist_name, release_date, spotify_link);
            all_albums.append(new_album);
            x += 1
                    
        }

        
        for (i in all_albums) {
            console.log('Info: ', i.artist_name);
            console.log('----------------------')
        };
}
*/

form.addEventListener( "submit", function(event) {
    event.preventDefault();

    var dropdown = document.getElementById("genreDropdown");
    var genre_choice = dropdown.value;
    console.log('RESPONSE: ', genre_choice)

    token = spotify_authorization_request();

    setTimeout(function() { 
        alert("Hello, your token is ready");
        console.log('TOKEN: ', token);

    }, 3000);


});
