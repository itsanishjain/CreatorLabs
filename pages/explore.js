import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import Loader from "../src/components/Loader";
import Dashboard from "../src/components/Dashboard";
import { UserContext } from "../src/context/UserContext";
import axios from "axios";

const ExplorePage = () => {
  const { account, isLoggedIn } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
    if (!account) return;

    axios
      .get(`/api/explore/`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [account, isLoggedIn, router]);

  if (isLoading && data.length === 0) return <Loader />;

  return (
    <div>
      <p className="text-center text-xl mt-4">Explore Projects</p>
      {data.map((d, index) => (
        <Dashboard key={index} data={d} />
      ))}
    </div>
  );
};

export default ExplorePage;
