const pool = require('./conexion')

const getPosts = async () => {
    try {
        const sql = 'SELECT * FROM post ORDER BY nombre'
        const resp = await pool.query(sql)

        if (resp.rowCount > 0) {
            return resp.rows
        } else {
            return []
        }
    } catch (error) {
        console.log(">>Error(Query: getPosts): ", error)
    }
}

const createPost = async (data) => {
    try {
        const sql = 'INSERT INTO post(nombre, descripcion) VALUES($1, $2) RETURNING id'
        const values = [data.nombre, data.descripcion]
        const resp = await pool.query(sql, values)
        
        if (resp.rowCount > 0) {
            return resp.rows[0]
        } else {
            return 'No se pudo crear el Post'
        }
    } catch (error) {
        console.log(">>Error(Query: createPost): ", error)
    }
}

const editPost = async (datos) => {
    try {
        const sql = 'UPDATE post SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING id'
        const values = [datos.nombre, datos.descripcion, datos.id]
        const resp = await pool.query(sql, values)
        
        if (resp.rowCount > 0) {
            return resp.rows[0]
        } else {
            return 'No se pudo actualizar el Post'
        }
    } catch (error) {
        console.log(">>Error(Query: editPost): ", error)
    }
}

const deletePost = async (id) => {
    try {
        const sql = 'DELETE FROM post WHERE id = $1 RETURNING id'
        const values = [id]
        const resp = await pool.query(sql, values)

        if (resp.rowCount > 0) {
            return resp.rows[0]
        } else {
            return 'No se pudo eliminar el Post'
        }
    } catch (error) {
        console.log(">>Error(Query: deletePost): ", error)
    }
}

module.exports = {
    getPosts,
    createPost,
    editPost,
    deletePost
}