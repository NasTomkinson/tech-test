import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Header } from "./";

const meta = {
  title: "Composites/Dashboard/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    user: {
      name: "Jordan Lee",
      avatarUrl: "/window.svg",
    },
    notificationCount: 3,
  },
  render: (args) => (
    <div className="w-[360px] md:w-[720px]">
      <Header {...args} />
    </div>
  ),
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoNotifications: Story = {
  args: {
    notificationCount: 0,
  },
};

export const ManyNotifications: Story = {
  args: {
    notificationCount: 124,
  },
};
