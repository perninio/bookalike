import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const { role } = useSelector(state => state.auth.user);
  console.log(role);
  return (
    <div className="container">
      {(role == "admin" ? AdminButtons : []).map(button => {
        return (
          <div className="row">
            <Link className="btn btn-primary vw-100" to={button.path}>
              {button.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

// const UserButtons =[{name: "Mój profile", path:}]

const AdminButtons = [
  { name: "Zarządzaj użytkownikami", path: "/manage/users" },
  { name: "Zarządzaj rekomendacjami", path: "/manage/recommendations" }
];
