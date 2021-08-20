const moduleName = 'posts';

const GET_POSTS = `${moduleName}/GET_POSTS`;
const GET_CHART = `${moduleName}/GET_CHART`
const DELETE_POST = `${moduleName}/DELETE_POST`;


const defaultState = {
  posts: [],
  chart:[]
};


export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_CHART:
      return { ...state, chart: [...state.chart,payload] };
    case GET_POSTS:
      return { ...state, posts: [...state.posts, payload] };
    case DELETE_POST:
      return { ...state, posts: state.posts.filter(item => item.id !== payload.id) };
    default:
      return state;
  }
};


export const getDataChart = (city) => async (dispatch) => {
  try {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d08fb237bada7340e9ce1b94502b7136`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_CHART, payload: data }))
  } catch (error) {
    console.log(error)
  }
}
export const getPosts = (city) => async (dispatch) => {
  try {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d08fb237bada7340e9ce1b94502b7136`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_POSTS, payload: data }))
  } catch (error) {
    console.log(error)
  }
}



export const deletePost = (id) => async (dispatch) => {
  try { 
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
          dispatch({ type: DELETE_POST, payload: { id } })
  } catch (error) {

  }
}
