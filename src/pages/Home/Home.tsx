import { Flex, Spinner } from '@radix-ui/themes';
import { useCallback, useEffect, useState } from 'react';
import { axiosApi } from '../../axiosApi';
import { ApiPosts, Post } from '../../types';
import { PostCard } from '../../components/PostCard/PostCard';

export const Home = () => {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPosts = useCallback(async () => {
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
      setIsLoading(false);
    } else {
      setPostsList([]);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  return (
    <Flex direction={'column'} mt={'3'}>
      {isLoading ? (
        <Spinner className={'spinner'} />
      ) : (
        postsList.map((post: Post) => <PostCard key={post.id} post={post} />)
      )}
    </Flex>
  );
};
