const initialState = {
  life: 100,
  attack: 1,
  level: 1
}

export default (state = initialState, action)  => {
  switch(action.type)
    {
      default:       return state   // something
    }
}
