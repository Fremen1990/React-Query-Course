import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
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
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");
    //
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },

    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
