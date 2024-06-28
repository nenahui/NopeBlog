import React, { PropsWithChildren } from 'react';
import { Button, Dialog, Flex, Separator, Text } from '@radix-ui/themes';
import { format } from 'date-fns';
import { Post } from '../../types';

interface Props extends PropsWithChildren {
  post: Post;
}

export const MoreModal: React.FC<Props> = ({ post, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content maxWidth='450px'>
        <Dialog.Title>More info</Dialog.Title>
        <Text as={'p'} color={'gray'} size={'2'}>
          Author
        </Text>
        <Dialog.Description size='2' mb='2'>
          {post.name}
        </Dialog.Description>

        <Separator size={'4'} my={'2'} />

        <Text as={'p'} color={'gray'} size={'2'}>
          Description
        </Text>
        <Dialog.Description size='2' mb='2'>
          {post.description}
        </Dialog.Description>

        <Separator size={'4'} my={'2'} />

        <Text as={'p'} color={'gray'} size={'2'}>
          Date
        </Text>
        <Dialog.Description size='2' mb='4'>
          {format(post.date, 'dd.MM.yy hh:mm aa')}
        </Dialog.Description>

        <Flex gap='3' mt='4' justify='end'>
          <Dialog.Close>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
