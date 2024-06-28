import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
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

export const Contacts = () => {
  return (
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
              <Text size={'2'}>+996 502 539 534</Text>
            </Flex>

            <Flex align={'center'} gap={'5'}>
              <EnvelopeClosedIcon width={'20'} height={'20'} />
              <Text size={'2'}>kanatraccoon@gmail.com</Text>
            </Flex>

            <Flex align={'center'} gap={'5'}>
              <HomeIcon width={'20'} height={'20'} />
              <Text size={'2'}>Maldybaeva 7/1, Kyrgyzstan, Bishkek,</Text>
            </Flex>
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
          <TextField.Root placeholder={'Last Name…'} style={{ width: '300px' }}>
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
  );
};
