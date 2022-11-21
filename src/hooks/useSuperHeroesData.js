import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // cacheTime: 5 *60* 1000, // default 5min cache
    // staleTime: 30 * 1000, // default: 0
    // refetchOnMount: "always", // default true
    // refetchOnWindowFocus: "always", // default true
    // refetchInterval: 2 * 1000, // default false
    // refetchIntervalInBackground: true, // default false
    // enabled: false,
    onSuccess: onSuccess,
    onError: onError,
    select: (data) => {
      const superHeroNames = data.data.map((hero) => hero.name);
      return superHeroNames;
    },
  });
};
