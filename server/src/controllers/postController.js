const db = require('../postgreSQL/postQueries')

var getPosts = (req, res) => {
    db.getPosts()
        .then(response => {
            console.log("Get", response)
            return res.json(response)
        }).catch(error => {
            console.log(">>Error(Controller: getPosts): ", error)
        })
}

var createPost = (req, res) => {
    const data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }

    db.createPost(data)
        .then(response => {
            console.log("Create: ", response)
            return res.json(response)
        }).catch(error => {
            console.log(">>Error(Controller: createPost): ", error)
        })
}

var editPost = (req, res) => {
    const { id } = req.params
    const data = {
        id: id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }

    db.editPost(data)
        .then(response => {
            console.log("Update: ", response)
            return res.json(response)
        }).catch(error => {
            console.log(">>Error(Controller: editPost): ", error)
        })
}

var deletePost = (req, res) => {
    const { id } = req.params

    db.deletePost(id)
        .then(response => {
            console.log("Delete: ", response)
            return res.json(response)
        }).catch(error => {
            console.log(">>Error(Controller: deletePost): ", error)
        })
}

module.exports = {
    getPosts,
    createPost,
    editPost,
    deletePost
}