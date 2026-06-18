import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockTransactions } from "@/app/api/_mock-data";

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

export const WithSearch: Story = {
  args: {
    showSearch: true,
  },
};

export const Empty: Story = {
  args: {
    transactions: [],
  },
};
