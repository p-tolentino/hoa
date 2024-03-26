import {
  Box,
  Flex,
  Link,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr
} from '@chakra-ui/react'

type KeyActivities = {
  title: string
  dueDate: string
  datePerformed: string
}[]

export default function ViewReviewResults ({
  keyActivities,
  activeStep,
  reportDetails
}: {
  keyActivities: KeyActivities
  activeStep: number
  reportDetails: any
}) {
  return (
    <Stack spacing={5}>
      <Flex gap={10}>
        <Box>
          <Flex justifyContent='space-between'>
            <Box>
              <Text
                fontWeight='semibold'
                fontFamily='font.heading'
                lineHeight={1}
              >
                Dispute Case: Review Results
              </Text>
              <Text fontFamily='font.body' fontSize='sm' color='grey'>
                Date created: March 22, 2024
              </Text>
            </Box>
            <Link
              href='#keyActivities'
              fontSize='sm'
              fontFamily='font.body'
              color='blue.500'
            >
              View Key Activities
            </Link>
          </Flex>
          <Box
            h='18vh'
            border='1px solid lightgray'
            borderRadius={5}
            p={3}
            overflowY='auto'
            flex={3}
            mt='1rem'
            w='600px'
          >
            <Text fontFamily='font.body' fontSize='sm' textAlign='justify'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              atque maxime nostrum voluptatum mollitia natus a aspernatur
              corrupti molestias asperiores quia fugit, sint repudiandae odit
              laborum alias earum modi sequi quod illum, necessitatibus dolores.
              Voluptatum qui odio ratione omnis ea?
            </Text>
          </Box>
        </Box>
        <Box>
          <Box>
            <Text
              fontWeight='semibold'
              fontFamily='font.heading'
              lineHeight={1}
            >
              Officer Assigned
            </Text>
            <Text fontFamily='font.body' fontSize='sm' color='grey'>
              Date assigned: March 22, 2024
            </Text>
          </Box>
          <Stack w='400px' spacing='0.5rem' pt='1rem'>
            <TableContainer>
              <Table
                variant='unstyled'
                fontFamily='font.body'
                size='sm'
                w='400px'
              >
                <Tbody>
                  <Tr whiteSpace='normal'>
                    <Th border='3px double black' w='110px'>
                      Officer Assigned
                    </Th>
                    <Td
                      border='3px double black'
                      color={
                        reportDetails.officerAssigned ? 'black' : 'lightgray'
                      }
                      fontStyle={
                        reportDetails.officerAssigned ? 'normal' : 'italic'
                      }
                    >
                      {reportDetails.officerAssigned
                        ? `${reportDetails.officerAssigned.firstName} ${reportDetails.officerAssigned.lastName}`
                        : 'Unassigned'}
                    </Td>
                  </Tr>
                  {reportDetails.officerAssigned && (
                    <Tr whiteSpace='normal'>
                      <Th border='3px double black' w='110px'>
                        Case Priority
                      </Th>
                      <Td
                        border='3px double black'
                        color={
                          reportDetails.priority === 'URGENT' ? 'red' : 'black'
                        }
                      >
                        {reportDetails.priority
                          ? `${reportDetails.priority}`
                          : 'N/A'}
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            <Text fontSize='xs' fontFamily='font.body' textAlign='justify'>
              This officer has been assigned to oversee this case exclusively.
              They are the sole authorized individual to provide progress
              reports regarding this case.
            </Text>
          </Stack>
        </Box>
      </Flex>
      <Box id='keyActivities'>
        <Box>
          <Text fontWeight='semibold' fontFamily='font.heading' lineHeight={1}>
            Key Activities for Officer Assigned
          </Text>
          <Text fontFamily='font.body' fontSize='sm' color='grey'>
            Date created: March 22, 2024
          </Text>
        </Box>
        <Stepper
          index={activeStep}
          orientation='vertical'
          w='max-content'
          h='50vh'
          p='1.5rem'
          gap='0'
          colorScheme='green'
          size='md'
          overflowY='auto'
        >
          {keyActivities.map((activity, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box fontFamily='font.body' w='10vw'>
                <StepTitle>{activity.title}</StepTitle>
                <StepDescription className='text-xs'>
                  {activity.dueDate}
                </StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
    </Stack>
  )
}
