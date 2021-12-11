import { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";

import "./profile-page.css";
import { ProfileNavigator } from "../../Components/profile-navigator";
import { useStores } from "../../hooks/useStores";
import { ApiCallStates } from "../../mobx-store/types";
import { observer } from "mobx-react";

export const ProfilePage = observer(() => {
  const { authStore } = useStores();
  const { getUserData, user, getUserState } = authStore;

  useEffect(() => {
    async function getData() {
      getUserData();
    }
    getData();
  }, []);

  return (
    <div className="profile-page-wrapper">
      <ProfileNavigator userType={user.type} />
      <div className="wrapper">
        <div className="outer">
          <div className="content animated fadeInLeft">
            <span className="bg animated fadeInDown">
              {user.type === "E" ? "Customer" : "Vendor"}
            </span>
            <h1>Profile Info:</h1>
            <h2>
              <div style={{ marginLeft: "20px" }}>Name: {user.full_name}</div>
            </h2>
            <h2>
              <div style={{ marginLeft: "20px" }}> Email: {user.email}</div>
            </h2>

            <div className="button">
              <a className="cart-btn" href="#">
                <i className="cart-icon ion-bag"></i>Balance
              </a>
              <a href="#">{user.balance ? user.balance : 0}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
