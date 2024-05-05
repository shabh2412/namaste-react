import { sample_restaurant_meta } from "../utils/mockData";
import Cuisine from "./Cuisine";

export default function Cuisines({ cuisines = sample_restaurant_meta?.cuisines }) {
  return <div className="cuisine-list my-4">
    {
      cuisines?.map(cuisine => <Cuisine key={cuisine} cuisine={cuisine} />)
    }
  </div>;
}