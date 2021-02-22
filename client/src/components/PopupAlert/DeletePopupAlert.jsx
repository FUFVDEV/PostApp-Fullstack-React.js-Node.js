import Swal from 'sweetalert2'

export const DeletePopupAlert = ({ initTitle, initText, initIcon,  finalTitle, finalText, finalIcon, action}) => {
    return (
        Swal.fire({
			title: initTitle,
			text: initText,
			icon: initIcon,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				action.customFunction()
					Swal.fire(
						finalTitle,
						finalText,
						finalIcon
					)
			}
		})
    )
}
