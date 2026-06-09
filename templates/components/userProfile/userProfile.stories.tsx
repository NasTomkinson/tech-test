import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UserProfile } from './';

const meta = {
  title: 'Components/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'Avery Stone',
    imageUrl: 'https://i.pravatar.cc/160?img=32',
  },
} satisfies Meta<typeof UserProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongName: Story = {
  args: {
    name: 'Alexandra Montgomery-Wright',
    imageUrl: 'https://i.pravatar.cc/160?img=47',
  },
};
