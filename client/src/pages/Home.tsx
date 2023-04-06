import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../helper/axios";
import Recomments from "../components/recomments/Recomments";
import Banners from "../components/banner/Banner";

interface Home {
  banners: string[];
  categories: { name: string; imageName: string }[];
}

export default function Page() {
  const history = useNavigate();

  const { isError, isLoading, data } = useQuery<Home>({
    queryKey: ["home"],
    queryFn: async () => {
      const { data } = await axios.get("/home");
      return data;
    },
  });

  if (isLoading || isError) {
    return <Skeleton />;
  }

  return (
    <div className="home-container">
      <Banners banners={data.banners} />
      <section className="category ">
        {data.categories?.map((catgory, index: number) => {
          return (
            <div
              className="category-card"
              id={`item-${index}`}
              key={index}
              onClick={() => history(`/shop/${catgory.name}`)}
            >
              <img src={catgory.imageName} alt="" />
            </div>
          );
        })}
      </section>
      <Recomments />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="home-container ">
      <div className="slider-wrapper">
        <div className="slider-ld skeleton border-white"></div>
      </div>
      <div className="category">
        <div className="category-ld skeleton border-white"></div>
      </div>
    </div>
  );
}
