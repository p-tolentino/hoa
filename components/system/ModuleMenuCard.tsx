'use client'

import {
  Card,
  CardBody,
  Heading,
  Button,
  ButtonGroup,
  Text,
  Stack,
  CardHeader
} from '@chakra-ui/react'
import Link from 'next/link'

interface CategoryButton {
  text: string
  href: string
  description: string
}

interface CategoryData {
  category: string
  category_users: string
  category_buttons: CategoryButton[]
}

const ModuleMenuCard: React.FC<{ data: CategoryData }> = ({ data }) => {
  const { category, category_users, category_buttons } = data
  return (
    <>
      <Card h='max-content' shadow='lg' w='full' p='5px'>
        <CardHeader pb={category_users !== '' ? '0' : '1'}>
          {/* Category Name */}
          <Heading size='md' color={'brand.500'} fontFamily='font.heading'>
            {category}
          </Heading>
          {/* Category Users */}
          {category_users !== '' && (
            <Text fontSize='sm' fontFamily='font.body'>
              For {category_users}
            </Text>
          )}
        </CardHeader>
        <CardBody>
          <ButtonGroup
            flexDir={'column'}
            gap={'0.5rem'}
            minW={'100%'}
            fontFamily='font.body'
          >
            <Stack>
              {/* Category Buttons */}
              {category_buttons.map(cButton => (
                <div key={cButton.text}>
                  <Button
                    w='full'
                    fontSize={'md'}
                    fontWeight='400'
                    bgColor='brand.300'
                    _hover={{
                      bgColor: '#fcdf86',
                      transform: 'scale(1.02)',
                      fontWeight: 'semibold'
                    }}
                    mb={category_users !== '' ? '0' : '10px'}
                    as={Link}
                    href={cButton.href}
                  >
                    {cButton.text}
                  </Button>
                  {cButton.description !== '' && (
                    <Text mb='2rem' mt='5px' fontSize='sm' textAlign='justify'>
                      {cButton.description}
                    </Text>
                  )}
                </div>
              ))}
            </Stack>
          </ButtonGroup>
        </CardBody>
      </Card>
    </>
  )
}

export default ModuleMenuCard
