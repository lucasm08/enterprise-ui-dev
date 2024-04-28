import { PropsWithChildren } from 'react';
import { render as _render, screen, waitFor } from 'test/utilities';
import { PackingList } from '.';
import { createStore } from './store';
import { Provider } from 'react-redux';

const render: typeof _render = (Component, option) => {
  const store = createStore();

  const Wrapper = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return _render(Component, { wrapper: Wrapper });
};

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButon = screen.getByRole('button', {
    name: 'Add New Item',
  });
  expect(newItemInput).toHaveValue('');
  expect(addNewItemButon).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButon = screen.getByRole('button', {
    name: 'Add New Item',
  });
  await user.type(newItemInput, 'MacBook Pro');
  expect(addNewItemButon).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButon = screen.getByRole('button', {
    name: 'Add New Item',
  });
  const item = 'MacBook Pro';
  await user.type(newItemInput, item);
  await user.click(addNewItemButon);

  expect(screen.getByLabelText(item)).not.toBeChecked();
});

it('Remove an Item ', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButon = screen.getByRole('button', {
    name: 'Add New Item',
  });
  const item = 'Ipad Pro';
  await user.type(newItemInput, item);
  await user.click(addNewItemButon);

  const removeItem = screen.getByLabelText(/remove/i);

  await user.click(removeItem);

  await waitFor(() => expect(removeItem).not.toBeInTheDocument());
});
