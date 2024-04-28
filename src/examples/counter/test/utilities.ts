import { render as RenderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export * from '@testing-library/react';

type RenderOptions = Parameters<typeof RenderComponent>[1];

export const render = (ui: React.ReactElement, options?: RenderOptions) => {
  return {
    ...RenderComponent(ui, options),
    user: userEvent.setup(),
  };
};
