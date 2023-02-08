import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const fetcher = (url: string) =>
    fetch(url)
        .then((r) => r.json())
        .then((data) => {
            return { user: data?.user || null }
        })

export interface useUserParams {
    redirectTo: string | undefined,
    redirectIfFound: boolean | undefined
}

export function useUser(params: useUserParams) {
    const { data, error } = useSWR('/api/user', fetcher);

    const user = data?.user;
    const finished = Boolean(data);
    const hasUser = Boolean(user);

    useEffect(() => {

        if (!params.redirectTo || !finished) return;
        if (
            (params.redirectTo && !params.redirectIfFound && !hasUser) ||
            (params.redirectIfFound && hasUser)
        ) {
            Router.push(params.redirectTo);
        }

    }, [params.redirectTo, params.redirectIfFound, finished, hasUser]);

    return error ? null : user;
}


