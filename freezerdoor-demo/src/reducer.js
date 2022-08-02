const reducer = (state, action) => {
  const newState = [...state.content];
  const i = state.content.findIndex((card) => {
    return card.id === action.payload.id;
  });

  const moveCard = () => {
    newState[i] = action.payload;
    return newState;
  };

  const deleteCard = () => {
    newState.splice(i);
    return newState;
  };

  const lockCard = () => {
    newState[i].draggable = false;
    return newState;
  }

  switch (action.type) {
    case "insertAll":
      return { content: action.payload };
    case "insert":
      return { content: [...state.content, action.payload] };
    case "move":
      return { content: moveCard() };
    case "lock":
      return { content: lockCard() };
    case "delete":
      return { content: deleteCard() };
    default:
      throw new Error();
  }
};

export {reducer};