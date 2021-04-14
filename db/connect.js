const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://quang0969266511:quang0969266511@cluster0.k62ys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
        console.log("connected successfully");
    })
    .catch(err => {
        console.log(err);
    })