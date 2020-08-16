export function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

const INITIAL_STATE = {
  data: [],
};

function handleAddData(state, payload) {
  return {
    ...state,
    data: payload.listdata,
  };
}

function handleDeleteData(state) {
  return {
    ...state,
    data: [],
  };
}

const ACTION = {
  "DATA/ADD_DATA": handleAddData,
  "DATA/DELETE_DATA": handleDeleteData,
};

export const addData = makeActionCreator("DATA/ADD_DATA", "listdata");
export const deleteAllData = makeActionCreator("DATA/DELETE_DATA");

export default function Data(state = INITIAL_STATE, action) {
  const handler = ACTION[action.type];
  state = action.type === ACTION.RESET_STATE ? INITIAL_STATE : state;
  return handler ? handler(state, action) : state;
}
