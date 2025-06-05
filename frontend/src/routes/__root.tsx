import { type QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

type RouteContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools position="bottom" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
