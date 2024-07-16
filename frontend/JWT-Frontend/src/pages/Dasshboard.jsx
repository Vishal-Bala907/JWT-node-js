import React from "react";
import { useContext } from "react";
import { userContext } from "../../context/useContext";

export default function Dasshboard() {
  const { user } = useContext(userContext);
  return (
    <div>
      <h1>Dashboard</h1>
      {user && <h1>hii {user.username}!!</h1>}
    </div>
  );
}
