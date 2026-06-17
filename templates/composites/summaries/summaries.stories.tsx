import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Summaries } from "./";

const meta = {
  title: "Composites/Dashboard/Summaries",
  component: Summaries,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    summaries: [
      {
        id: "monthly-deposits",
        title: "Deposits (June)",
        amount: 3700,
        icon: "ic:round-trending-up",
        tone: "success",
      },
      {
        id: "monthly-withdrawals",
        title: "Withdrawals (June)",
        amount: 86.42,
        icon: "ic:sharp-trending-down",
        tone: "error",
      },
    ],
  },
  render: (args) => (
    <div className="grid w-[360px] grid-cols-2 gap-3 md:w-[720px] md:grid-cols-4">
      <Summaries {...args} />
    </div>
  ),
} satisfies Meta<typeof Summaries>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    summaries: [],
  },
};
