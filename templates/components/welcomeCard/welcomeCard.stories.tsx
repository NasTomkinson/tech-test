import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { WelcomeCard } from './';

const meta = {
  title: 'Components/WelcomeCard',
  component: WelcomeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'Avery Stone',
    imageUrl: 'https://i.pravatar.cc/160?img=32',
  },
} satisfies Meta<typeof WelcomeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

 ;
