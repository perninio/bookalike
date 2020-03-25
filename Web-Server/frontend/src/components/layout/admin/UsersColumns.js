import React from "react";
import { Link } from "react-router-dom";
import { EditProfilePage } from "../user/EditProfilPage";

export const UserColumns = [
  {
    Header: "Dane użytkownika",
    columns: [
      {
        Header: "ID",
        accessor: "userid",
        filterable: true,
        width: 100
      },
      {
        Header: "Adres email",
        accessor: "email",
        filterable: true,
        width: 100
      },
      {
        Header: "Typ konta",
        accessor: "role"
      }
    ]
  },
  {
    Header: "Status konta",
    columns: [
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Kod konta",
        accessor: "account_code"
      }
    ]
  },
  {
    Header: "Akcje",
    width: 250,
    Cell: props => {
      return (
        <React.Fragment>
          <Link
            className="btn btn-info ml-3"
            to={"/manage/edit-user-profile/" + props.original.userid}
          >
            Edytuj
          </Link>
        </React.Fragment>
      );
    }
  }
];
