import { Avatar, Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { faker } from '@faker-js/faker';

export const About = () => {
  const randomParagraph = faker.lorem.paragraph();
  return (
    <Card my={'3'}>
      <Flex gap={'5'} align={'center'} justify={'center'}>
        <Avatar size={'8'} src={'/kanat.jpg'} radius={'small'} fallback={'T'} />
        <Box>
          <Heading weight={'bold'} size={'6'}>
            Hello World!
          </Heading>
          <Heading weight={'bold'} size={'4'}>
            A Bit About Me
          </Heading>
          <Text as={'p'} size={'2'} color={'gray'}>
            {randomParagraph}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};
