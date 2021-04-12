let spotifyVote;
let appleVote;

function countPoll(vote) {

    if (vote == "apple") {
        console.log('VOTE = APPLE')
        appleVote += 1;
        console.log(appleVote);
    } else {
        console.log('VOTE = SPOTIFY')
        spotifyVote += 1;
        console.log(spotifyVote);
    }
}

document.querySelector('#spotify').addEventListener("click", function() {
    console.log('Click spotify worked')
    countPoll('spotify');
});

document.querySelector('#appleMusic').addEventListener("click", function() {
    console.log('Click apple worked')
    countPoll('apple');
});