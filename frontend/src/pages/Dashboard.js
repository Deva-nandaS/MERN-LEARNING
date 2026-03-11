import { useEffect, useState } from "react";
import { getDashboard } from "../api/auth";

export const Dashboard = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <h1>Welcome {user.email}</h1>
  );
};