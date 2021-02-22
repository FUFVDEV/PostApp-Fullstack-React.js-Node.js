import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, createPost, deletePost, updatePost, setFormData, saveFilter, setIsFilter, fillFilteredPost, setEditMode } from '../../redux/postDucks'
import { TextField, Button, Chip, Avatar } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import ActionTable from '../../components/ActionTable/ActionTable'
import Form from '../../components/Form/Form'
import styles from './style'

const Post = () => {

	const dispatch = useDispatch()
	const classes = styles()
	const { postsList, filteredPostsList, formData, filter, isFilter, editMode } = useSelector(store => store.post)

	const columns = [
		{ title: 'Nombre', field: 'nombre' },
		{ title: 'Descripción', field: 'descripcion' }
	]

	useEffect(() => {
		const fetchData = () => {
			dispatch(getPosts())
		}
		fetchData()
	}, [])

	const handleInputChange = (event) => {
		dispatch(saveFilter(event.target.value))

		if (event.target.value.trim() === "") {
			dispatch(setIsFilter(false))
		}
	}

	const filtrarPost = () => {
		if (Array.isArray(postsList)) {
			let arrayFiltrado = postsList.filter(post => {
				if (post.nombre.toLowerCase().includes(filter.toLowerCase())) {
					return post
				}
			})
			dispatch(fillFilteredPost(arrayFiltrado))
			dispatch(setIsFilter(true))
		}
	}

	return (
		<div className={classes.contenedor}>
			<div className={classes.titulo}>
				<Chip
					label="Bienvenidos a Posts-App"
					avatar={<Avatar>P</Avatar>}
					color="primary"
				/>
			</div>

			<div className={classes.buscador}>
				<TextField
					label="Filtro de Nombre"
					name="filtro"
					variant="outlined"
					size="small"
					value={filter}
					onChange={handleInputChange}
				/>
				<Button
					type="button"
					variant="contained"
					color="primary"
					startIcon={<Search />}
					disableElevation
					onClick={filter ? filtrarPost : null}
				>
					Buscar
            	</Button>
			</div>

			<ActionTable
				columns={columns}
				data={isFilter ? filteredPostsList : postsList}
				deleteAction={deletePost}
				setEditMode={setEditMode}
			/>

			<div className={classes.formulario}>
				<Form
					formData={formData}
					setFormData={setFormData}
					createPost={createPost}
					updatePost={updatePost}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			</div>
		</div>

	)

}

export default Post