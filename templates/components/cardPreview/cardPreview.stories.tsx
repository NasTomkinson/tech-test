import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CardPreview } from './';

const meta = {
  title: 'Components/CardPreview',
  component: CardPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    accountType: 'currentAccount',
    balance: 1200,
    accountNumber: '12345678',
    status: 'Active',
    accountId: 'acc-current-1',
  },
} satisfies Meta<typeof CardPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CurrentAccount: Story = {};

export const Savings: Story = {
  args: {
    accountType: 'savings',
    balance: 8450.25,
    accountNumber: '87654321',
    status: 'Active',
    accountId: 'acc-savings-1',
  },
};

export const Credit: Story = {
  args: {
    accountType: 'credit',
    balance: 540.1,
    accountNumber: '44556677',
    status: 'Pending',
    accountId: 'acc-credit-1',
  },
};
