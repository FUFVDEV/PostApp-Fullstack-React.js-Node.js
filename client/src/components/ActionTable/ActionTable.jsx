import React from 'react'
import { useDispatch } from 'react-redux'
import { setEditMode } from '../../redux/postDucks'
import MaterialTable from 'material-table'
import { Edit, Delete } from '@material-ui/icons';
import { DeletePopupAlert } from '../PopupAlert/DeletePopupAlert'

const ActionTable = ({ columns, data = [], deleteAction, setEditMode }) => {

	const dispatch = useDispatch()
	
	const handleEditPost = (event, rowData) => {
		dispatch(setEditMode({
			editMode: true,
			id: rowData.id,
			nombre: rowData.nombre,
			descripcion: rowData.descripcion
		}))
	}

	const handleDeletePost = (event, rowData) => {
		DeletePopupAlert({
			initTitle: "¿Estás seguro?",
			initText: `Eliminarás ${rowData.nombre}`,
			initIcon: "warning",
			finalTitle: "Eliminado",
			finalText: `${rowData.nombre} eliminado exitosamente`,
			finalIcon: "success",
			action: {customFunction: function(){dispatch(deleteAction(rowData.id))}}
		})
	}

	return (
		<MaterialTable
			title="Lista de Posts"
			columns={columns}
			data={Array.isArray(data) ? data : []}
			actions={[
				{
					icon: Edit,
					tooltip: 'Editar Post',
					onClick: (event, rowData) => handleEditPost(event, rowData)
				},
				{
					icon: Delete,
					tooltip: 'Eliminar Post',
					onClick: (event, rowData) => handleDeletePost(event, rowData)
				}
			]}
			options={{
				actionsColumnIndex: 2,
				paging: false,
				search: false
			}}
			localization={{
				body:{ emptyDataSourceMessage: "No hay datos para mostrar"}
			}				
			}
		/>
	)
}

export default ActionTable
