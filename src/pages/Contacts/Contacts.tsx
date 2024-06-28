import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Text,
  TextField,
} from '@radix-ui/themes';
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  HomeIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  MobileIcon,
  PersonIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { useCallback, useEffect, useState } from 'react';
import { ApiContacts } from '../../types';
import { axiosApi } from '../../axiosApi';
import { Notification } from '../../components/Notification/Notification';

export const Contacts = () => {
  const [data, setData] = useState<ApiContacts | null>();
  const [isNotificationShow, setIsNotificationShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosApi.get<ApiContacts | null>('contacts.json');
      if (response.data) setData(response.data);
    } catch (error) {
      setIsNotificationShow(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  if (isLoading) return <Spinner className={'spinner'} />;

  return (
    <>
      <Notification show={isNotificationShow} color={'red'}>
        There was an error loading data, please try again later
      </Notification>
      <Card size={'2'} my={'3'}>
        <Flex justify={'between'} gap={'3'}>
          <Flex justify={'between'} direction={'column'} gap={'9'}>
            <Box>
              <Heading>Contact Information</Heading>
              <Text as={'p'} color={'gray'}>
                Say something to start a live chat!
              </Text>
            </Box>

            <Flex direction={'column'} gap={'4'}>
              <Flex align={'center'} gap={'5'}>
                <MobileIcon width={'20'} height={'20'} />
                <Text size={'2'}>{data?.phone}</Text>
              </Flex>

              <Flex align={'center'} gap={'5'}>
                <EnvelopeClosedIcon width={'20'} height={'20'} />
                <Text size={'2'}>{data?.email}</Text>
              </Flex>

              <Flex align={'center'} gap={'5'}>
                <HomeIcon width={'20'} height={'20'} />
                <Text size={'2'}>{data?.address}</Text>
              </Flex>

              <Button variant={'ghost'} size={'1'}>
                Edit
              </Button>
            </Flex>
          </Flex>

          <Flex gap={'3'} direction={'column'} justify={'between'}>
            <TextField.Root
              placeholder={'First Name…'}
              style={{ width: '300px' }}
            >
              <TextField.Slot>
                <PersonIcon height={'16'} width={'16'} />
              </TextField.Slot>
            </TextField.Root>
            <TextField.Root
              placeholder={'Last Name…'}
              style={{ width: '300px' }}
            >
              <TextField.Slot>
                <PersonIcon height={'16'} width={'16'} />
              </TextField.Slot>
            </TextField.Root>
            <TextField.Root placeholder={'Email…'} style={{ width: '300px' }}>
              <TextField.Slot>
                <EnvelopeClosedIcon height={'16'} width={'16'} />
              </TextField.Slot>
            </TextField.Root>
            <TextField.Root
              placeholder={'Phone Number…'}
              style={{ width: '300px' }}
            >
              <TextField.Slot>
                <MobileIcon height={'16'} width={'16'} />
              </TextField.Slot>
            </TextField.Root>

            <Flex align={'center'} justify={'between'}>
              <Flex justify={'between'} gap={'3'}>
                <Button variant={'ghost'} color={'gray'} asChild>
                  <a href='#'>
                    <GitHubLogoIcon width={'22'} height={'22'} />
                  </a>
                </Button>

                <Button variant={'ghost'} color={'blue'} asChild>
                  <a href='#'>
                    <LinkedInLogoIcon width={'22'} height={'22'} />
                  </a>
                </Button>

                <Button variant={'ghost'} color={'crimson'} asChild>
                  <a href='#'>
                    <InstagramLogoIcon width={'22'} height={'22'} />
                  </a>
                </Button>

                <Button variant={'ghost'} color={'sky'} asChild>
                  <a href='#'>
                    <TwitterLogoIcon width={'22'} height={'22'} />
                  </a>
                </Button>
              </Flex>

              <Button>Submit</Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
