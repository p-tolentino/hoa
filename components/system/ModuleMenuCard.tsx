'use client'

import {
  Card,
  CardBody,
  Heading,
  Button,
  ButtonGroup,
  Box,
  Text,
  Stack
} from '@chakra-ui/react'
import Link from 'next/link'

const ModuleMenuCard = ({
  data: {
    category,
    category_users,
    category_buttons,
    category_hrefs,
    category_descriptions
  }
}: {
  data: {
    category: string
    category_users: string[]
    category_buttons: string[]
    category_hrefs: string[]
    category_descriptions: string[]
  }
}) => {
  return (
    <>
      <Box w='25vw' mb='3rem'>
        <Heading size='md' mb='1rem' fontFamily='font.heading'>
          {category}
        </Heading>
        {category_users !== null && (
          <Text lineHeight='1.2px' mb='1.5rem'>
            For {category_users}
          </Text>
        )}
        <Card h='max-content' shadow='md'>
          <CardBody>
            <ButtonGroup
              flexDir={'column'}
              gap={'0.5rem'}
              minW={'100%'}
              fontFamily='font.body'
            >
              <Stack>
                {category_buttons.map((button, index) => (
                  <>
                    <Button
                      key={index}
                      fontSize={'lg'}
                      fontWeight='400'
                      bgColor='brand.300'
                      _hover={{
                        bgColor: '#fcdf86',
                        transform: 'scale(1.02)',
                        fontWeight: 'semibold'
                      }}
                      as={Link}
                      href={category_hrefs[index]}
                    >
                      {button}
                    </Button>
                    <Text mb='2rem' ml='1rem'>
                      {category_descriptions[index]}
                    </Text>
                  </>
                ))}
              </Stack>
            </ButtonGroup>
          </CardBody>
        </Card>
      </Box>
    </>
  )
}

export default ModuleMenuCard
