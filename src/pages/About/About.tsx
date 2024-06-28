import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@radix-ui/themes';
import { useCallback, useEffect, useState } from 'react';
import { ApiAbout } from '../../types';
import { axiosApi } from '../../axiosApi';
import { Notification } from '../../components/Notification/Notification';

export const About = () => {
  const [data, setData] = useState<ApiAbout | null>();
  const [isNotificationShow, setIsNotificationShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosApi.get<ApiAbout | null>('about.json');
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
      <Card my={'3'}>
        <Flex gap={'5'} align={'center'} justify={'center'}>
          <Avatar
            size={'8'}
            src={data?.image}
            radius={'small'}
            fallback={'T'}
          />
          <Box>
            <Flex justify={'between'} align={'center'}>
              <Heading weight={'bold'} size={'6'}>
                {data?.title}
              </Heading>
              <Button variant={'ghost'} mr={'2'}>
                Edit
              </Button>
            </Flex>
            <Heading weight={'bold'} size={'4'}>
              {data?.subtitle}
            </Heading>
            <Text as={'p'} size={'2'} color={'gray'}>
              {data?.description}
            </Text>
          </Box>
        </Flex>
      </Card>
    </>
  );
};
