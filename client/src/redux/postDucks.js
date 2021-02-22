import axios from 'axios'

const dataInicial = {
    formData: {
        nombre: '',
        descripcion: ''
    },
    postsList: [],
    filteredPostsList: [],
    filter: '',
    isFilter: false,
    editMode: false,
    editID: null
}

// Type
const POSTS_EXITO = 'POST_EXITO'
const POSTS_EXITO_CREATE = 'POSTS_EXITO_CREATE'
const POSTS_EXITO_UPDATE = 'POSTS_EXITO_UPDATE'
const POSTS_EXITO_DELETE = 'POSTS_EXITO_DELETE'
const SET_FORM_DATA_EXITO = 'SET_FORM_DATA_EXITO'
const SAVE_FILTER_EXITO = 'SAVE_FILTER_EXITO'
const IS_FILTER_EXITO = 'IS_FILTER_EXITO'
const FILTERED_POST_EXITO = 'FILTERED_POST_EXITO'
const EDIT_MODE_EXITO = 'EDIT_MODE_EXITO'

// Reducer
export default function postReducer(state = dataInicial, action) {
    switch (action.type) {
        case POSTS_EXITO:
            return { ...state, postsList: action.payload }
        case POSTS_EXITO_CREATE:
            return { ...state, postsList: [...state.postsList, action.payload] }
        case POSTS_EXITO_DELETE:
            return { ...state, postsList: state.postsList.filter(post => post.id !== action.payload) }
        case POSTS_EXITO_UPDATE:
            return {
                ...state, postsList: state.postsList.map((item) => (item.id !== action.payload.id ? item : action.payload))
            }
        case SET_FORM_DATA_EXITO:
            return { ...state, formData: { ...state.formData, ...action.payload } }
        case SAVE_FILTER_EXITO:
            return { ...state, filter: action.payload }
        case IS_FILTER_EXITO:
            return { ...state, isFilter: action.payload }
        case FILTERED_POST_EXITO:
            return { ...state, filteredPostsList: action.payload }
        case EDIT_MODE_EXITO:
            return { ...state, formData: { nombre: action.payload.nombre, descripcion: action.payload.descripcion }, editMode: action.payload.editMode, editID: action.payload.id }
        default:
            return { ...state };
    }
}

// Actions.
export const getPosts = () => (dispatch) => {
    console.log(">>Redux Action: Get")
    axios.get(process.env.REACT_APP_API_URL)
        .then(reponse => {
            dispatch({
                type: POSTS_EXITO,
                payload: reponse.data
            })
        })
        .catch(error => {
            console.log(">>Error(getPosts): ", error)
        })
}

export const createPost = (data) => (dispatch) => {
    console.log(">>Redux Action: Create")
    const newPost = {
        nombre: data.nombre,
        descripcion: data.descripcion
    }

    axios.post(process.env.REACT_APP_API_URL + '/create', newPost)
        .then(response => {
            dispatch({
                type: POSTS_EXITO_CREATE,
                payload: Object.defineProperty(newPost, 'id', { value: response.data.id })
            })
        })
        .catch(error => {
            console.log(">>Error(createPost): ", error)
        })
}

export const deletePost = (id) => (dispatch) => {
    console.log(">>Redux Action: Delete")
    axios.delete(process.env.REACT_APP_API_URL + `/delete/${id}`)
        .then(response => {
            dispatch({
                type: POSTS_EXITO_DELETE,
                payload: response.data.id
            })
        })
        .catch(error => {
            console.log(">>Error(deletePost): ", error)
        })
}

export const updatePost = (data) => (dispatch, getState) => {

    console.log(">>Redux Action: Update")
    const id = getState().post.editID
    const editedPost = {
        nombre: data.nombre,
        descripcion: data.descripcion
    }

    axios.put(process.env.REACT_APP_API_URL + `/update/${id}`, data)
        .then(response => {
            dispatch({
                type: POSTS_EXITO_UPDATE,
                payload: Object.defineProperty(editedPost, 'id', { value: response.data.id })
            })
        })
        .catch(error => {
            console.log(">>Error(updatePost): ", error)
        })
}

export const setFormData = (data) => (dispatch) => {
    dispatch({
        type: SET_FORM_DATA_EXITO,
        payload: data
    })
}

export const saveFilter = (filter) => (dispatch) => {
    dispatch({
        type: SAVE_FILTER_EXITO,
        payload: filter
    })
}

export const setIsFilter = (booleanValue) => (dispatch) => {
    dispatch({
        type: IS_FILTER_EXITO,
        payload: booleanValue
    })
}

export const fillFilteredPost = (arrayFiltrado) => (dispatch) => {
    dispatch({
        type: FILTERED_POST_EXITO,
        payload: arrayFiltrado
    })
}

export const setEditMode = (data) => (dispatch) => {
    dispatch({
        type: EDIT_MODE_EXITO,
        payload: data
    })
}