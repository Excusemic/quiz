const reducer = (state, action) => {
  const { type, payload } = action
  if (type === "UPDATED_GAME_QUESTIONS") {
    return { ...state, ...payload }
  }
  return { ...state }
}

export default reducer
