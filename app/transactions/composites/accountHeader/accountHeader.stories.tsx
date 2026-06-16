import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AccountHeader } from './';

const meta = {
  title: 'Composites/Transactions/AccountHeader',
  component: AccountHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AccountHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
