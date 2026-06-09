import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CardType } from './';

const meta = {
  title: 'Components/cardType',
  component: CardType,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    accountType: 'currentAccount',
    balance: 'GBP 1,200.00',
    accountNumber: '12345678',
    status: 'Active',
  },
} satisfies Meta<typeof CardType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CurrentAccount: Story = {};

export const Savings: Story = {
  args: {
    accountType: 'savings',
    balance: 'GBP 8,450.25',
    accountNumber: '87654321',
    status: 'Active',
  },
};

export const Credit: Story = {
  args: {
    accountType: 'credit',
    balance: 'GBP 540.10',
    accountNumber: '44556677',
    status: 'Pending',
  },
};
