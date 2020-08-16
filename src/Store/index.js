import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./../Reducers";

export function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState,
  });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./../Reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
}

const store = configureAppStore();
export default store;
