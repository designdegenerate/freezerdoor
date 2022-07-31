const reducer = (state, action) => {
  const moveCard = () => {
    const i = state.content.findIndex((card) => {
      return card.id === action.payload.id;
    });
    const newState = [...state.content];
    newState[i] = action.payload;
    console.log(action.payload);
    return newState;
  };

  const deleteCard = () => {
    let i = state.content.findIndex((card) => {
      return card.id === action.payload;
    });
    const newState = [...state.content];
    newState.splice(i);
    return newState;
  };

  switch (action.type) {
    case "insertAll":
      return { content: action.payload };
    case "insert":
      return { content: [...state.content, action.payload] };
    case "move":
      return { content: moveCard() };
    case "delete":
      return { content: deleteCard() };
    default:
      throw new Error();
  }
};

export {reducer};