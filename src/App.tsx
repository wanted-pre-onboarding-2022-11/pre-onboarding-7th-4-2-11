import React from "react";
import AppRouter from "./routes/AppRouter";
import { FetchDataAPI } from "./apis/";

export const fetchDataAPI = new FetchDataAPI();

function App() {
  return <AppRouter></AppRouter>;
}

export default App;
