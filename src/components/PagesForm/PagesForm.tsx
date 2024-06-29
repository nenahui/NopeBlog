import React, { ChangeEvent, useState } from 'react';
import { Button, Card, Flex, Heading, TextField } from '@radix-ui/themes';
import { PersonIcon } from '@radix-ui/react-icons';
import { ApiAbout, ApiContacts } from '../../types';
import { axiosApi } from '../../axiosApi';
import { Notification } from '../Notification/Notification';
import { useNavigate } from 'react-router-dom';

interface Props {
  type: 'about' | 'contacts';
}

export const PagesForm: React.FC<Props> = ({ type }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotificationShow, setIsNotificationShow] = useState<boolean>(false);
  const [aboutMutation, setAboutMutation] = useState<ApiAbout | null>({
    description: '',
    image: '',
    subtitle: '',
    title: '',
  });
  const [contactMutation, setContactMutation] = useState<ApiContacts | null>({
    address: '',
    email: '',
    phone: '',
  });
  const navigate = useNavigate();

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (type === 'contacts' && contactMutation) {
      setContactMutation({
        ...contactMutation,
        [name]: value,
      });
    } else if (type === 'about' && aboutMutation) {
      setAboutMutation({
        ...aboutMutation,
        [name]: value,
      });
    }
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axiosApi.put(
        type === 'about' ? 'about.json' : 'contacts.json',
        type === 'about' ? aboutMutation : contactMutation
      );
    } catch (error) {
      setIsNotificationShow(true);
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
      navigate(type === 'about' ? '/about' : '/contacts');
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Notification color={'red'} show={isNotificationShow}>
        An error occurred while changing the page data, please try again later
      </Notification>
      <Card>
        <Heading size={'5'} weight={'medium'} mb={'2'}>
          Edit {type === 'about' ? 'about' : 'contacts'} page data
        </Heading>
        <Flex direction={'column'} gap={'3'}>
          <TextField.Root
            placeholder={type === 'about' ? 'Title…' : 'Phone…'}
            value={
              type === 'about' ? aboutMutation?.title : contactMutation?.phone
            }
            name={type === 'about' ? 'title' : 'phone'}
            onChange={onFieldChange}
            required
          >
            <TextField.Slot>
              <PersonIcon />
            </TextField.Slot>
          </TextField.Root>

          <TextField.Root
            placeholder={type === 'about' ? 'Subtitle…' : 'Email…'}
            value={
              type === 'about'
                ? aboutMutation?.subtitle
                : contactMutation?.email
            }
            name={type === 'about' ? 'subtitle' : 'email'}
            onChange={onFieldChange}
            required
          >
            <TextField.Slot>
              <PersonIcon />
            </TextField.Slot>
          </TextField.Root>

          <TextField.Root
            placeholder={type === 'about' ? 'Description…' : 'Address…'}
            onChange={onFieldChange}
            value={
              type === 'about'
                ? aboutMutation?.description
                : contactMutation?.address
            }
            name={type === 'about' ? 'description' : 'address'}
            required
          >
            <TextField.Slot>
              <PersonIcon />
            </TextField.Slot>
          </TextField.Root>

          {type === 'about' && (
            <TextField.Root
              placeholder={'Image…'}
              onChange={onFieldChange}
              value={aboutMutation?.image}
              name={'image'}
              required
            >
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </TextField.Root>
          )}

          <Button
            type={'submit'}
            variant={'surface'}
            className={'pointer'}
            disabled={isLoading}
            loading={isLoading}
          >
            Edit
          </Button>
        </Flex>
      </Card>
    </form>
  );
};
