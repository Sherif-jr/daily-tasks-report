import appReducer from "./app.slice";
import cacheReducer from "./cache.slice";

const slices = {
  app: appReducer,
  cache: cacheReducer,
};

export default slices;
