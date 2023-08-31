import React, { useState } from "react";
import loader from '../../Assets/images/loader.gif'

const SingleAdmin = ({ admin }) => {

  const apiUrl = process.env.REACT_APP_API_ROOT;

  console.log(admin);
  const [selectedAction, setSelectedAction] = useState(() => {
    if (admin.isAdmin) return "Admin";
    else return "User";
  });
  const [isLoading, setIsLoading] = useState(false);
  const authToken = localStorage.getItem("auth-token");

  const actions = ["User", "Admin"];

  const handleUpdateRole = (newRole) => {
    let isAdmin;
    if (newRole === "User") {
      isAdmin = false;
    } else {
      isAdmin = true;
    }
    setIsLoading(true);

    fetch(`${apiUrl}/auth/change-role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        userId: admin._id,
        isAdmin,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          setSelectedAction(newRole);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
      });
  };

  return (
    <tr>
      <td>{admin.name}</td>
      <td>{admin.email}</td>
      <td>
        {isLoading ? (
          <img width="100px" src={loader} alt='loader' />
        ) : (
          <form>
            <label htmlFor="selectedAction">
              <select
                className="form-select"
                id="selectedAction"
                name="selectedAction"
                disabled={!actions.length}
                value={selectedAction}
                onChange={(e) => handleUpdateRole(e.target.value)}
              >
                {actions.map((selectedAction) => (
                  <option value={selectedAction}>{selectedAction}</option>
                ))}
              </select>
            </label>
          </form>
        )}
      </td>
    </tr>
  );
};

export default SingleAdmin;
