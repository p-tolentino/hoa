import { Box, Heading, Text } from '@chakra-ui/react'

interface HeaderProps {
  title?: string
  instructions?: string
}

const Header: React.FC<HeaderProps> = ({ title, instructions }) => {
  return (
    <Box
      h={'max-content'}
      py='25px'
      px='35px'
      pos={'sticky'}
      top={'0'}
      bgColor={'#5B8060'}
      color={'white'}
      zIndex={2}
    >
      <Heading size={'xl'} fontFamily='font.heading' mb='2px'>
        {title}
      </Heading>
      <Text fontFamily={'font.body'} color={'white'}>
        {instructions}
      </Text>
    </Box>
  )
}
export default Header
