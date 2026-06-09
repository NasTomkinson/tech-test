import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Logo } from './';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    horizontal: true,
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    horizontal: false,
  },
};
