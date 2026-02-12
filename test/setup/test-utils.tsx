import { AuthGuardProvider } from '@/components/providers/auth-guard-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement, type ReactNode } from 'react';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

export const createWrapper = (queryClient: QueryClient) => {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthGuardProvider>{children}</AuthGuardProvider>
      </QueryClientProvider>
    );
  };
};

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

export const renderWithProviders = (
  ui: ReactElement,
  options: RenderWithProvidersOptions = {}
) => {
  const queryClient = options.queryClient ?? createTestQueryClient();
  const wrapper = createWrapper(queryClient);

  return {
    queryClient,
    ...render(ui, {
      ...options,
      wrapper,
    }),
  };
};
