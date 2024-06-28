import React, { useState } from 'react';
import { Cross2Icon, MagicWandIcon, PersonIcon } from '@radix-ui/react-icons';
import { PostMutation } from '../../types';
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
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Notification } from '../Notification/Notification';

export const PostForm = () => {
  const navigate = useNavigate();
  const [postMutation, setPostMutation] = useState<PostMutation>({
    description: '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotificationShow, setIsNotificationShow] = useState<boolean>(false);

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

      await axiosApi.post('posts.json', postData);
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

  return (
    <form onSubmit={onFormSubmit}>
      <Notification show={isNotificationShow} color={'red'}>
        An unexpected error occurred, please try again later.
      </Notification>
      <Card size={'2'} my={'3'}>
        <Flex direction={'column'}>
          <Flex justify={'between'} align={'center'}>
            <Text size={'4'}>Create new post</Text>
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
              <Button
                variant={'ghost'}
                color={'red'}
                type={'button'}
                className={'pointer'}
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
          >
            <Spinner loading={isLoading} />
            Create a new post
          </Button>
        </Flex>
      </Card>
    </form>
  );
};
