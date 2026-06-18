import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockAccounts, mockTransactions } from "@/app/api/_mock-data";

import { TransactionList } from "./";

const meta = {
  title: "Composites/Transactions/TransactionList",
  component: TransactionList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    transactions: mockTransactions.slice(0, 20),
  },
  render: (args) => (
    <div className="w-[360px] md:w-[720px]">
      <TransactionList {...args} />
    </div>
  ),
} satisfies Meta<typeof TransactionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithControls: Story = {
  args: {
    hasControls: true,
  },
};

export const WithAccountCards: Story = {
  args: {
    accounts: mockAccounts,
    hasControls: true,
  },
};

export const WithoutControls: Story = {
  args: {
    hasControls: false,
  },
};

export const Empty: Story = {
  args: {
    transactions: [],
  },
};
