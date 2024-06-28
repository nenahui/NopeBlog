import { Flex, Spinner, Text } from '@radix-ui/themes';
import { useCallback, useEffect, useState } from 'react';
import { axiosApi } from '../../axiosApi';
import { ApiPosts, Post } from '../../types';
import { PostCard } from '../../components/PostCard/PostCard';
import { Notification } from '../../components/Notification/Notification';

export const Home = () => {
  const [postsList, setPostsList] = useState<Post[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNotificationShow, setIsNotificationShow] = useState<boolean>(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosApi.get<ApiPosts | null>('/posts.json');
      const postsResponse = response.data;

      if (postsResponse !== null) {
        const posts = Object.keys(postsResponse).map((id: string) => {
          return {
            ...postsResponse[id],
            id,
          };
        });

        setPostsList(posts);
      } else {
        setPostsList([]);
      }
    } catch (error) {
      console.error(error);
      setIsNotificationShow(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  if (!isLoading && postsList?.length === 0) {
    return (
      <Text as={'p'} mt={'2'} align={'center'}>
        The list of posts is empty
      </Text>
    );
  }

  return (
    <Flex direction={'column'} mt={'3'}>
      <Notification show={isNotificationShow} color={'red'}>
        There was an error loading posts, please try again later
      </Notification>

      {isLoading ? (
        <Spinner className={'spinner'} />
      ) : (
        postsList?.map((post: Post) => <PostCard key={post.id} post={post} />)
      )}
    </Flex>
  );
};
