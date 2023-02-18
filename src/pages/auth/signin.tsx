import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
  signIn,
} from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import { AiFillGoogleSquare, AiFillGithub } from "react-icons/ai";
import Layout from "@/components/Layout";

const EmailForm = ({ csrfToken }: any) => {
  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="mt-5">
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <div className="relative w-full">
          <input
            placeholder="Email"
            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
            type="email"
            id="email"
            name="email"
          />
        </div>
      </div>

      <button
        className="button-text button-color border border-transparent hover:button-hover focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700  group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg w-full mt-5"
        type="submit"
      >
        <span className="flex items-center rounded-md text-sm px-4 py-2">
          Sign in with Email
        </span>
      </button>
    </form>
  );
};

interface ProviderAuthProps {
  provider: ClientSafeProvider;
}

const AuthWithGoogle = ({ provider }: ProviderAuthProps) => {
  return (
    <button
      className="text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg w-full mt-5 bg-gray-900"
      onClick={() => signIn(provider.id)}
    >
      <span className="flex items-center rounded-md text-sm px-4 py-2">
        <AiFillGoogleSquare size={40} />
        Sign in with Google
      </span>
    </button>
  );
};

const AuthWithGitHub = ({ provider }: ProviderAuthProps) => {
  return (
    <button
      className="text-white border border-transparent hover:bg-gray-900 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg w-full mt-5 bg-gray-800"
      onClick={() => signIn(provider.id)}
    >
      <span className="flex items-center rounded-md text-sm px-4 py-2">
        <AiFillGithub size={30} />
        Sign in with GitHub
      </span>
    </button>
  );
};

export default function SignIn({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const providersValues = Object.values(providers);

  return (
    <Layout>
      <div className="max-w-sm w-full rounded-lg shadow dark:bg-transparent dark:border-gray-700">
        {/* {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {
              (() => {
                switch (provider.name) {
                  case "Email": return <EmailForm csrfToken={csrfToken} />
                  case "Google": return <AuthWithGoogle provider={provider} />
                  case "GitHub": return <AuthWithGitHub provider={provider} />
                }
              })()
            }

          </div>
        ))} */}
        <EmailForm csrfToken={csrfToken} />
        <div className="flex flex-row gap-2">
          <AuthWithGoogle
            provider={providersValues.find(
              (provider) => provider.name === "Google"
            )}
          />
          <AuthWithGitHub
            provider={providersValues.find(
              (provider) => provider.name === "GitHub"
            )}
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, options);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers: Object.values(providers) ?? [], csrfToken },
  };
}
