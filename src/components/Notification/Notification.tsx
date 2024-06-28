import React, { PropsWithChildren } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import { NotificationColorTypes } from '../../types';

interface Props extends PropsWithChildren {
  color: NotificationColorTypes;
  show: boolean;
}

export const Notification: React.FC<Props> = ({ color, show, children }) => {
  return (
    show && (
      <Callout.Root color={color} my={'3'} role={'alert'}>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>{children}</Callout.Text>
      </Callout.Root>
    )
  );
};
