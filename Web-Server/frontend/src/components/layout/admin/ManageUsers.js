import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserColumns } from "./UsersColumns";
import { DataTable } from "./../common/DataTable";
import {
  webserverAPIUserEndpoint,
  authorizationAPITokenEndpoint
} from "../../../constants/serverEndpoint";
import { useSelector } from "react-redux";
import { setAuthorizationToken } from "../../../utils/jwtUtils";

export const ManageUsers = () => {
  const [data, setData] = useState({});
  let auth = useSelector(state => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(webserverAPIUserEndpoint)
        .then(result => {
          setData(result.data.data);
        })
        .catch(err => {
          const { error } = err.response.data;
          if (error == "TokenExpiredError" || error == "JsonWebTokenError") {
            axios
              .post(authorizationAPITokenEndpoint, auth.user)
              .then(data => {
                const { token } = data.data;

                setAuthorizationToken(token);
                axios
                  .get(webserverAPIUserEndpoint)
                  .then(result => {
                    setData(result.data.data);
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          }
        });
    };
    fetchData();
  }, []);

  return (
    <div className="bg-light">
      <DataTable
        columns={UserColumns}
        data={data.length > 0 ? data : []}
        size={8}
      />
    </div>
  );
};
