import requests
import json
import base64

CLIENT_ID = 'ae8f1fc90de04911bfc2ebf5465104ed'
CLIENT_SECRET = '493c92764d534257927d6bf6f1b654a7'


class Album: 
    
    def __init__(self, album_name, artist_name, release_date, spotify_link):
        self.album_name = album_name
        self.artist_name = artist_name
        self.release_date = release_date
        self.spotify_link = spotify_link
    
    def info(self):
        return f"{self.album_name} by {self.artist_name}, released: {self.release_date} ({self.spotify_link})"


def spotify_authorization_request():
    ''' Returns a token that allows access to the spotify API

    Parameters
    ----------
    None

    Returns
    -------
    string
        token that allows access to the spotify API 
    '''
    # spotify requires authorization to utilize API. I am issuing authorization based on my client ID and client secret, not an individual user authorization flow
    auth_str = '{}:{}'.format(CLIENT_ID, CLIENT_SECRET)

    b64_auth_str = base64.urlsafe_b64encode(auth_str.encode()).decode()

    headers = {
    'Authorization': 'Basic {}'.format(b64_auth_str)
    }

    data = {
    'grant_type': 'client_credentials'
    }

    post_request = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data)

    response_data = json.loads(post_request.text)

    # the access_token allows access to general spotify API
    access_token = response_data['access_token']

    return(access_token)

def spotify_api_request(access_token, genre):
    ''' Prints a list of the top ten results from spotify API
    Additionally, adds each result to the SQL database

    Parameters
    ----------
    access token from spotify authorization
    genre option chosen by user

    Returns
    -------
    '''

    headers = {
    'Authorization': 'Bearer {}'.format(access_token)
    }

    params = (
        ('seed_genres', genre),
        ('min_energy', '0.4'),
        ('min_popularity', '50'),
        ('market', 'US'),
        ('limit', '10')
    )

    get_request = requests.get('https://api.spotify.com/v1/recommendations', headers=headers, params=params)

    response_data = json.loads(get_request.content)

    x = 0

    all_albums = []

    while x < 10:
        spotify_link = response_data['tracks'][x]['external_urls']['spotify']
        album_name = response_data['tracks'][x]['album']['name']
        artist_name = response_data['tracks'][x]['album']['artists'][0]['name']
        release_date = response_data['tracks'][x]['album']['release_date']
        new_album = Album(album_name, artist_name, release_date, spotify_link)
        all_albums.append(new_album)
        x += 1
        
    for i in all_albums: 
        print(i.info())
        print('----------------------')


token = spotify_authorization_request()
print("TOKEN, ", token)