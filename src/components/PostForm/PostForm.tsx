import React, { useEffect, useState } from 'react';
import {
  Cross2Icon,
  MagicWandIcon,
  PersonIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { ApiPost, PostMutation } from '../../types';
import {
  Box,
  Button,
  Card,
  Flex,
  Spinner,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { axiosApi } from '../../axiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Notification } from '../Notification/Notification';

interface Props {
  type: 'create' | 'edit';
}

export const PostForm: React.FC<Props> = ({ type }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [postMutation, setPostMutation] = useState<PostMutation>({
    description: '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isNotificationShow, setIsNotificationShow] = useState<boolean>(false);

  useEffect(() => {
    if (type === 'edit') {
      const fetchData = async () => {
        setIsDataLoading(true);

        const response = await axiosApi.get<ApiPost | null>(
          `/posts/${params.postId}.json`
        );
        if (response.data) {
          setPostMutation(response.data);
          setIsDataLoading(false);
        }
      };

      void fetchData();
    }
  }, [params.postId, type]);

  const deletePost = async () => {
    let isError = false;
    try {
      setIsLoading(true);
      await axiosApi.delete(`/posts/${params.postId}.json`);
    } catch (error) {
      setIsNotificationShow(true);
      isError = true;
    } finally {
      setIsLoading(false);
      if (!isError) {
        navigate('/');
      }
    }
  };

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPostMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let isError = false;

    try {
      setIsLoading(true);

      const postData = {
        ...postMutation,
        date: new Date().toISOString(),
      };

      if (type === 'create') {
        await axiosApi.post('posts.json', postData);
      } else {
        await axiosApi.put(`posts/${params.postId}.json`, postData);
      }
    } catch (error) {
      setIsNotificationShow(true);
      isError = true;
    } finally {
      setIsLoading(false);
      if (!isError) {
        navigate('/');
      }
    }
  };

  const randomFieldValues = () => {
    setPostMutation({
      name: faker.person.fullName(),
      description: faker.lorem.paragraph(),
    });
  };

  if (isDataLoading) {
    return <Spinner className={'spinner'} loading={isDataLoading} />;
  }

  return (
    <form onSubmit={onFormSubmit}>
      <Notification show={isNotificationShow} color={'red'}>
        An unexpected error occurred, please try again later.
      </Notification>
      <Card size={'2'} my={'3'}>
        <Flex direction={'column'}>
          <Flex justify={'between'} align={'center'}>
            <Text size={'4'}>
              {type === 'create' ? 'Create a new' : 'Edit'} post
            </Text>
            <Flex justify={'between'} gap={'5'}>
              <Button
                type={'button'}
                variant={'ghost'}
                className={'pointer'}
                onClick={() => randomFieldValues()}
              >
                Random values
                <MagicWandIcon />
              </Button>
              {type === 'edit' && (
                <Button
                  variant={'ghost'}
                  color={'red'}
                  type={'button'}
                  className={'pointer'}
                  onClick={() => deletePost()}
                >
                  Delete post
                  <TrashIcon />
                </Button>
              )}
              <Button
                variant={'ghost'}
                color={'red'}
                type={'button'}
                className={'pointer'}
                onClick={() => navigate('/')}
              >
                Cancel
                <Cross2Icon />
              </Button>
            </Flex>
          </Flex>

          <Box my={'2'}>
            <Text>Author</Text>
            <TextField.Root
              placeholder={'Author`s name…'}
              value={postMutation.name}
              onChange={onFieldChange}
              name={'name'}
              required
            >
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </TextField.Root>
          </Box>

          <Box my={'2'}>
            <Text>Description</Text>
            <TextArea
              rows={7}
              resize={'vertical'}
              placeholder={'Post description…'}
              value={postMutation.description}
              onChange={onFieldChange}
              name={'description'}
              required
            />
          </Box>

          <Button
            mt={'2'}
            variant={'surface'}
            type={'submit'}
            disabled={isLoading}
            className={'pointer'}
          >
            <Spinner loading={isLoading} />
            {type === 'create' ? 'Create a new post' : 'Edit post'}
          </Button>
        </Flex>
      </Card>
    </form>
  );
};
