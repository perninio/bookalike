import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const { id, role } = useSelector(state => state.auth.user);
  return (
    <div className="mt-5">
      {arrayToButtons(defaultButtons(id))}
      {role == "admin" && <hr></hr>}
      {arrayToButtons(role == "admin" ? AdminButtons : [])}
    </div>
  );
};

const arrayToButtons = array => {
  return array.map(button => {
    return (
      <div className="row mt-1">
        <Link className="btn btn-primary vw-100" to={button.path}>
          <i className={button.icon}></i>
          <span className="pl-3">{button.name}</span>
        </Link>
      </div>
    );
  });
};

const defaultButtons = id => {
  return [
    { name: "Mój profil", path: "/user-page/" + id, icon: "fas fa-user" },
    { name: "Rekomendacje", path: "/recommendations", icon: "fas fa-book" }
  ];
};

const AdminButtons = [
  {
    name: "Zarządzaj użytkownikami",
    path: "/manage/users",
    icon: "fas fa-user"
  },
  {
    name: "Zarządzaj rekomendacjami",
    path: "/manage/recommendations",
    icon: "fas fa-tasks"
  }
];
