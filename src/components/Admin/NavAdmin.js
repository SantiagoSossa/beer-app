import React from "react";
// import { Link } from "react-router-dom";
const NavAdmin = props => {
  const hideDropDown = e => {
    const dropDown = document.querySelectorAll(".dropDownLiUser");

    dropDown.forEach(dropDown => {
      if (!dropDown.contains(e.target)) {
        dropDown.style.visibility = "hidden";
        document.removeEventListener("click", hideDropDown);
        return;
      }
    });
  };

  const showDropDownLiUser = () => {
    const dropDown = document.querySelectorAll(".dropDownLiUser");
    dropDown.forEach(dropDown => {
      dropDown.style.visibility = "visible";
    });
    document.addEventListener("click", hideDropDown);
  };

  const sideLeftMobileHandler = () => {
    const sideLeft = document.querySelector(".sideLeftMobile");
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
    modal.addEventListener("click", hideAll);
    sideLeft.style.left = "0%";
  };

  const hideAll = () => {
    const sideLeft = document.querySelector(".sideLeftMobile");
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    sideLeft.style.left = "-100%";
  };

  return (
    <div className="" id="navAdmin">
      <div className="modal"></div>
      <div id="navAdminMobile">
        <div className="barsAdminMobile">
          <i
            onClick={sideLeftMobileHandler}
            id="barsNavAdmin"
            className="fas fa-bars"></i>
        </div>
        <div onClick={showDropDownLiUser} className="userLiItem">
          {props.userEmail.charAt(0)}
          <div className="dropDownLiUser">
            <button onClick={props.logout}>Logout</button>
          </div>
        </div>
      </div>
      <div id="navAdminDesktop">
        <div></div>
        <ul>
          <li onClick={showDropDownLiUser} className="userLiItem">
            {props.userEmail.charAt(0)}
            <div className="dropDownLiUser">
              <button onClick={props.logout}>Logout</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavAdmin;
