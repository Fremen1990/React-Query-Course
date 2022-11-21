import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const { data, isLoading, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      // cacheTime: 5 *60* 1000, // default 5min cache
      // staleTime: 30 * 1000, // default: 0
      // refetchOnMount: "always", // default true
      // refetchOnWindowFocus: "always", // default true
      refetchInterval: 2 * 1000, // default false
      refetchIntervalInBackground: true, // default false
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
