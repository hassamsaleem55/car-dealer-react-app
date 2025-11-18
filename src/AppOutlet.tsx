import { useState } from "react";
import { Outlet } from "react-router-dom";

function AppOutlet() {
  const [queryString, setQueryString] = useState("");
  return (
    <Outlet
      context={{
        queryString,
        setQueryString,
      }}
    />
  );
}

export default AppOutlet;
