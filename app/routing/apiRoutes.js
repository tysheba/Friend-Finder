var friends = require("../data/friends")

module.exports = function (app) {



    // display a JSON of all possible friends
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    // This will be used to handle incoming survey results. 
    // This route will also be used to handle the compatibility logic
    app.post("/api/friends", function (req, res) {

        var newFriend = req.body;
        console.log(newFriend)
        //takes the new friend's scores to compare with friends in Friends data

        var newFriendScores = req.body.scores;
        var scoresArray = [];
        var numFriends = 0;
        var bestMatch = 0;

        //runs through all current friends in list
        for (var i = 0; i < friends.length; i++) {
            var scoresDiff = 0;
            //compare scores between user and friends in the current database 
            for (var j = 0; j < newFriendScores.length; j++) {
                scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j])));
            }

            //push results into scoresArray
            scoresArray.push(scoresDiff);
        }

        //after all friends are compared, find best match
        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }

        //return bestMatch data
        var bestFriend = friends[bestMatch];
        res.json(bestFriend);
        console.log(`my new friend ${JSON.stringify(bestFriend)}`)

        // We then add the json the user sent to the friends array
        friends.push(newFriend);

        // We then display the JSON to the users  ?
        // res.json(newFriend);

    });
}