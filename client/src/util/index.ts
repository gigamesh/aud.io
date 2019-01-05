// SAVE STATE TO LOCAL STORAGE (in the event of a page refresh)
export const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // ignore error
  }
};

// LOAD STATE FROM LOCAL STORAGE (in the event of a page refresh)
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined; // reducer will return Redux state, as localstorage is null.
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
