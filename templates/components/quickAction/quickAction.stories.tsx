import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { QuickAction } from "./";

const meta = {
  title: "Components/quickAction",
  component: QuickAction,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "View statements",
    description: "View your account statements",
    icon: "material-symbols:account-balance-wallet-outline",
  },
} satisfies Meta<typeof QuickAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TransferMoney: Story = {
  args: {
    title: "Transfer money",
    description: "Move money between accounts",
    icon: "material-symbols:swap-horiz-rounded",
  },
};

export const PayBill: Story = {
  args: {
    title: "Pay bill",
    description: "Settle a bill from your current account",
    icon: "material-symbols:receipt-long-outline",
  },
};

export const LinkAction: Story = {
  args: {
    href: "/transactions",
    title: "Recent transactions",
    description: "Review your latest payments and deposits",
    icon: "material-symbols:history-rounded",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    title: "International transfer",
    description: "Available once account checks are complete",
    icon: "material-symbols:public-rounded",
  },
};
