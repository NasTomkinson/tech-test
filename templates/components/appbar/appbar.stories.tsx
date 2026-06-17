import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Appbar } from './';

const meta = {
  title: 'Components/Appbar',
  component: Appbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Appbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

 
