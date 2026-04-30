import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    console.log("Komponen dimount pertama kali");
  }, []);

  return (
    <h1 className="text-2xl font-bold">
      Selamat Datang di Dashboard
    </h1>
  );
};

export default Dashboard;