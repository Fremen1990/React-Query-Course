import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHoroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueriesPage = () => {
  const { data: superHeroes } = useQuery("super-heroes", fetchSuperHoroes);
  const { data: friends } = useQuery("friends", fetchFriends);

  return (
    <div>
      <h2>ParallelQueriesPage</h2>
    </div>
  );
};
