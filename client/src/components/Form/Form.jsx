import React from 'react'
import { useDispatch } from 'react-redux'
import { Grid, TextField, Button } from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'

const Form = ({ formData, setFormData, createPost, updatePost, setEditMode, editMode }) => {

	const dispatch = useDispatch()

	const handleInputChange = (event) => {
		dispatch(setFormData({
			[event.target.name]: event.target.value
		}))
	}

	const handleCreatePost = (event) => {
		event.preventDefault()

		if (!formData.nombre.trim()) {
			console.log("Nombre vacío")
			return
		}

		if (!formData.descripcion.trim()) {
			console.log("Descripción vacía")
			return
		}

		dispatch(createPost(formData))	
		dispatch(setFormData({
			nombre: '',
			descripcion: ''
		}))
	}

	const handleEditPost = (event) => {
		event.preventDefault()

		dispatch(updatePost(formData))
		dispatch(setEditMode({
			editMode: false,
			id: null,
			nombre: '',
			descripcion: ''
		}))
	}

	return (
		<form onSubmit={editMode ? handleEditPost : handleCreatePost}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={5}>
					<TextField
						label="Nombre"
						name="nombre"
						variant="outlined"
						size="small"
						required
						fullWidth
						value={formData.nombre}
						onChange={handleInputChange}
					>
					</TextField>
				</Grid>
				<Grid item xs={12} md={5}>
					<TextField
						label="Descripción"
						name="descripcion"
						variant="outlined"
						size="small"
						required
						fullWidth
						value={formData.descripcion}
						onChange={handleInputChange}
					>
					</TextField>
				</Grid>
				<Grid item xs={12} md={2}>
					{
						editMode ?
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								size="large"
								fullWidth
								startIcon={<AddCircleOutline />}
								disableElevation>
								Editar
							</Button>
							:
							<Button
								type="submit"
								variant="contained"
								color="primary"
								size="large"
								fullWidth
								startIcon={<AddCircleOutline />}
								disableElevation>
								Crear
							</Button>
					}
				</Grid>
			</Grid>
		</form>
	)
}

export default Form
