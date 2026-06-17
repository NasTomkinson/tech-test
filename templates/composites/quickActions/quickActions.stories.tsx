import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { QuickActions } from "./";

const meta = {
  title: "Composites/Dashboard/QuickActions",
  component: QuickActions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    actions: [
      {
        id: "quick-action-transfer-money",
        title: "Transfer money",
        icon: "material-symbols:swap-horiz-rounded",
        href: "/accounts",
      },
      {
        id: "quick-action-pay-bill",
        title: "Pay bill",
        icon: "material-symbols:receipt-long-outline",
        href: "/transactions",
      },
      {
        id: "quick-action-view-statements",
        title: "View statements",
        icon: "material-symbols:account-balance-wallet-outline",
        href: "/accounts",
      },
      {
        id: "quick-action-recent-transactions",
        title: "Recent transactions",
        icon: "material-symbols:history-rounded",
        href: "/transactions",
      },
    ],
  },
  render: (args) => (
    <div className="grid w-[360px] grid-cols-2 gap-3 md:w-[720px] md:grid-cols-4">
      <QuickActions {...args} />
    </div>
  ),
} satisfies Meta<typeof QuickActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    actions: [],
  },
};
