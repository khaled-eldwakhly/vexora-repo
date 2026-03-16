"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryVlient = new QueryClient();

export default function QueryClientProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryVlient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
