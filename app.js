let express = require('express');
let app = express();
let PORT = process.env.PORT || 3000;
let path = require('path');
let mongoose = require('mongoose');
let Post = require("./models/postModel");
let methodOverride = require("method-override");

let db = "mongodb+srv://diannaskyhar:f48yt368fvhv@cluster0.qp3mt.mongodb.net/Node-blog";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get('/', (req, res) => {
    res.render("index", {title: 'Home page'});
});

app.get('/add-post', (req, res) => {
    res.render("add-post", {title: 'Add new post'});
});

app.post('/add-post', (req, res) => {
    let { author, title } = req.body;
    let post = new Post({ author, title });
    post
        .save()
        .then(() => res.redirect("/posts"))
        .catch((error) => {
            console.log(error);
            res.render("error");
        });
});

app.get("/posts", (req, res) => {
    Post.find()
        .then((posts) => res.render("posts", { title:
                "Posts", posts }))
        .catch((error) => {
            console.log(error);
            res.render("error");
        });
});

app.get("/edit-post/:id", (req, res) => {
    let id = req.params.id;
    Post.findById(id)
        .then((post) =>
            res.render("edit-post", { title: post.
                    title, id: post._id, post })
        )
        .catch((error) => {
            console.log(error);
            res.render("error");
        });
});

app.put("/edit-post/:id", (req, res) => {
    let id = req.params.id;
    const { author, title } = req.body;
    Post.findByIdAndUpdate(id, { author, title })
        .then(() => res.redirect(`/posts`))
        .catch((error) => {
            console.log(error);
            res.render(createPath("error"));
        });
});

app.delete("/posts/:id",(req, res) =>{
    let id = req.params.id;
    Post.findByIdAndDelete(id)
        .then((posts) => res.render("posts", { title:
                "Posts", posts }))
        .catch((error) => {
            console.log(error);
            res.render("error");
        });
});

async function start() {
    try {
        await mongoose.connect(db);
        console.log('Connestion to MongoDB is success!');
        app.listen(PORT, () => {
            console.log(`Server is listening PORT ${PORT}`);
        });
    } catch (error) {
        console.log(" \n Connection error! \n\n", error);
    }
}

start();