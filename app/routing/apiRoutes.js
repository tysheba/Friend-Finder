var friends = require("../data/friends")

module.exports = function (app) {



    // display a JSON of all possible friends
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    // This will be used to handle incoming survey results. 
    // This route will also be used to handle the compatibility logic
    app.post("/api/friends", function (req, res) {

        var newfriend = req.body; //?

        console.log(newfriend);

        // We then add the json the user sent to the friends array
        friends.push(newfriend);

        // We then display the JSON to the users  ?
        res.json(newfriend);

    });
}