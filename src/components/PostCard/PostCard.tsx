import React from 'react';
import { Post } from '../../types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Avatar, Button, Card, Flex, Text } from '@radix-ui/themes';
import { DoubleArrowRightIcon } from '@radix-ui/react-icons';

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const splitName = (name: string) =>
    name.split(' ').map((splitName) => splitName.charAt(0));

  return (
    <Card size={'1'} mb={'4'}>
      <Flex gap={'1'} direction={'column'}>
        <Flex justify={'between'} align={'center'}>
          <Flex gap={'3'} align={'center'}>
            <Avatar
              size={'3'}
              radius={'large'}
              fallback={splitName(post.name)}
            />
            <Text weight={'medium'} color={'gray'}>
              {post.name}
            </Text>
          </Flex>
          <Text size={'2'} color={'gray'}>
            Created on {format(post.date, 'dd.MM.yy hh:mm aa')}
          </Text>
        </Flex>
        <Flex align={'center'} justify={'between'} gap={'3'}>
          <Text className={'text-overflow'}>{post.description}</Text>
          <Link to={`/post/${post.id}/edit`}>
            <Button variant={'surface'} className={'pointer'}>
              Read more
              <DoubleArrowRightIcon width={'16px'} height={'16px'} />
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Card>
  );
};
