'use client'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Card,
  CardBody,
  Box,
  Flex,
  Text
} from '@chakra-ui/react'
import ViolationBylaws from './_components/ViolationBylaws'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function ViolationReviewProcess () {
  const steps = [
    { title: 'Request for Violation Review', description: 'Lorem ipsum' },
    { title: 'Gather Sufficient Information', description: 'Lorem ipsum' },
    { title: 'Board Decision to Intervine', description: 'Lorem ipsum' },
    { title: 'HOA Negotiation', description: 'Lorem ipsum' }
  ]

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length
  })

  return (
    <div>
      <Flex justifyContent='space-between'>
        <Heading
          title='Violation Review Process Guide'
          description='Read more about the violation review process.'
        />
      </Flex>
      <Separator className='mt-4 mb-6' />

      <Flex gap={5}>
        <Stepper
          index={activeStep}
          orientation='vertical'
          height='400px'
          width='min-content'
          gap='0'
          colorScheme='yellow'
        >
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box
                flexShrink='0'
                fontFamily='font.body'
                w='10vw'
                onClick={() => Request}
              >
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Box>
          <Card shadow='lg' mb='1rem'>
            <CardBody>
              <ScrollArea className='h-[60vh] p-5'>
                {/* Phase 1 */}
                {activeStep === 0 && (
                  <Text fontFamily='font.body' textAlign='justify'>
                    <span className='font-bold text-green-700'>Phase 1</span>{' '}
                    --- Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cum maiores repellendus officiis. Culpa nihil ad recusandae
                    adipisci aut, nulla eius! Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Iusto amet id adipisci fugit
                    ipsa dolor incidunt nulla, possimus deleniti, repudiandae
                    consectetur! Cumque, eaque. Voluptates placeat laborum
                    tenetur natus alias. Rerum adipisci odit harum? Laudantium
                    dicta facere nisi impedit modi unde. Inventore soluta ipsum
                    aspernatur, tempore rem laudantium nihil harum assumenda
                    praesentium exercitationem facere totam laborum, magni
                    possimus incidunt labore hic! Impedit veritatis laboriosam
                    quasi natus id porro possimus ipsam incidunt mollitia
                    corporis facere officia velit eaque officiis et hic quaerat
                    asperiores ullam, maxime perferendis. Dolorum cum laborum,
                    repellat odit error facere ea reprehenderit explicabo quas
                    laboriosam corporis vel ipsam tempore! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Officia eveniet nesciunt
                    iste, numquam, tempora minus deleniti id nemo quam magnam et
                    temporibus ducimus molestias impedit quasi at dolores
                    corrupti alias, unde maiores? Ex nemo laborum vitae at
                    eligendi obcaecati debitis praesentium beatae illo ratione.
                    Magni dignissimos ducimus nisi fuga laboriosam. Accusamus et
                    ut quisquam quas cupiditate alias quasi explicabo voluptates
                    corporis ullam excepturi dolorum, soluta dignissimos qui
                    neque ipsa tempora eaque quibusdam, animi eius fuga rem.
                    Odio nesciunt voluptas consectetur! Laudantium quis, tempore
                    officia corporis nihil aliquam sequi aspernatur deserunt sit
                    vero rem eveniet. Assumenda repudiandae delectus possimus
                    rerum eum esse, rem id incidunt? Sapiente, quas, fugit autem
                    nulla, similique adipisci quia sint eum amet unde
                    repellendus cum. Repudiandae itaque quas iure dolor nulla
                    aut ducimus dolorem, autem quaerat ipsam officiis nisi
                    nesciunt aliquam reiciendis necessitatibus vel vero sunt
                    dicta nam impedit facilis. Fugit perferendis adipisci
                    obcaecati assumenda ab dolorum sint, sequi quae explicabo,
                    aut incidunt, iste quia unde! Consequuntur sapiente, tempora
                    molestias non vitae, sunt nemo aut provident et quo aliquam
                    porro harum molestiae, eveniet deserunt recusandae voluptate
                    nobis ab eligendi atque dignissimos? Asperiores aut, quis
                    voluptatum magnam minus ad, natus, dolores porro debitis
                    voluptatibus odio laborum fugit accusamus repudiandae
                    laudantium amet deserunt labore? Ex mollitia perspiciatis
                    quam autem ad dignissimos exercitationem error consectetur
                    eius? Laboriosam, possimus minus aliquid sapiente sequi
                    cupiditate ex a dignissimos impedit fuga quisquam, quis
                    quaerat. Ullam, exercitationem! Temporibus, eius? Tenetur,
                    minima ullam. Nisi accusantium, non quas id aliquid fugit
                    similique sit eius doloremque nobis ex unde. Fugiat repellat
                    aperiam soluta recusandae ipsum autem voluptate iste dolore
                    quae molestiae dolores explicabo, sunt vitae earum
                    consequuntur adipisci quidem, mollitia sint animi! Ad fuga
                    porro laudantium, hic illo voluptas asperiores minus sunt,
                    quaerat distinctio, odit ipsa. Accusamus, suscipit?
                    Accusantium, quod! Consequuntur eaque quisquam nam quae sit
                    reprehenderit officiis sint numquam vel dolores perferendis
                    eius nemo tenetur, sapiente perspiciatis cumque atque?
                    Doloribus odit possimus pariatur magni a, accusamus atque
                    nesciunt numquam quas, omnis illum facilis soluta
                    perspiciatis! Dolorem omnis sint, eos earum eligendi error
                    vitae assumenda, optio qui, repudiandae debitis doloremque
                    dolores asperiores! Omnis, harum quasi consequuntur
                    voluptatem provident quaerat delectus enim vitae odit
                    officiis culpa officia maiores sunt nesciunt. Consequuntur
                    nobis molestias sit cum eius dicta consequatur harum, cumque
                    iure recusandae voluptate atque adipisci aspernatur odio
                    explicabo aliquam error deserunt officiis, quisquam quos
                    sint dolorem corrupti architecto? Aspernatur esse beatae
                    harum velit consectetur. Distinctio repellendus sapiente
                    consequatur ea, quis labore, optio impedit deserunt, culpa
                    vitae expedita eveniet repudiandae exercitationem a
                    blanditiis. Rem, quis cumque error quae rerum suscipit ad
                    aliquam provident quas consectetur iusto dicta sapiente quod
                    temporibus, non quam! Fugit odio unde ipsum neque, delectus
                    aperiam exercitationem distinctio illum cum recusandae natus
                    tempora nihil blanditiis ut ad similique provident ullam
                    eaque mollitia tenetur voluptas. Error sint, excepturi
                    beatae vero nemo sapiente architecto non est animi earum
                    eius pariatur modi, nisi inventore soluta, accusantium hic!
                    Odit dignissimos debitis perspiciatis corrupti at
                    reprehenderit quis minus quia ipsa aliquam obcaecati facere
                    molestiae nobis libero recusandae vero a, culpa nisi.
                  </Text>
                )}

                {/* Phase 2 */}
                {activeStep === 1 && (
                  <Text fontFamily='font.body' textAlign='justify'>
                    <span className='font-bold text-green-700'>Phase 2</span>{' '}
                    --- Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cum maiores repellendus officiis. Culpa nihil ad recusandae
                    adipisci aut, nulla eius! Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Iusto amet id adipisci fugit
                    ipsa dolor incidunt nulla, possimus deleniti, repudiandae
                    consectetur! Cumque, eaque. Voluptates placeat laborum
                    tenetur natus alias. Rerum adipisci odit harum? Laudantium
                    dicta facere nisi impedit modi unde. Inventore soluta ipsum
                    aspernatur, tempore rem laudantium nihil harum assumenda
                    praesentium exercitationem facere totam laborum, magni
                    possimus incidunt labore hic! Impedit veritatis laboriosam
                    quasi natus id porro possimus ipsam incidunt mollitia
                    corporis facere officia velit eaque officiis et hic quaerat
                    asperiores ullam, maxime perferendis. Dolorum cum laborum,
                    repellat odit error facere ea reprehenderit explicabo quas
                    laboriosam corporis vel ipsam tempore! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Officia eveniet nesciunt
                    iste, numquam, tempora minus deleniti id nemo quam magnam et
                    temporibus ducimus molestias impedit quasi at dolores
                    corrupti alias, unde maiores? Ex nemo laborum vitae at
                    eligendi obcaecati debitis praesentium beatae illo ratione.
                    Magni dignissimos ducimus nisi fuga laboriosam. Accusamus et
                    ut quisquam quas cupiditate alias quasi explicabo voluptates
                    corporis ullam excepturi dolorum, soluta dignissimos qui
                    neque ipsa tempora eaque quibusdam, animi eius fuga rem.
                    Odio nesciunt voluptas consectetur! Laudantium quis, tempore
                    officia corporis nihil aliquam sequi aspernatur deserunt sit
                    vero rem eveniet. Assumenda repudiandae delectus possimus
                    rerum eum esse, rem id incidunt? Sapiente, quas, fugit autem
                    nulla, similique adipisci quia sint eum amet unde
                    repellendus cum. Repudiandae itaque quas iure dolor nulla
                    aut ducimus dolorem, autem quaerat ipsam officiis nisi
                    nesciunt aliquam reiciendis necessitatibus vel vero sunt
                    dicta nam impedit facilis. Fugit perferendis adipisci
                    obcaecati assumenda ab dolorum sint, sequi quae explicabo,
                    aut incidunt, iste quia unde! Consequuntur sapiente, tempora
                    molestias non vitae, sunt nemo aut provident et quo aliquam
                    porro harum molestiae, eveniet deserunt recusandae voluptate
                    nobis ab eligendi atque dignissimos? Asperiores aut, quis
                    voluptatum magnam minus ad, natus, dolores porro debitis
                    voluptatibus odio laborum fugit accusamus repudiandae
                    laudantium amet deserunt labore? Ex mollitia perspiciatis
                    quam autem ad dignissimos exercitationem error consectetur
                    eius? Laboriosam, possimus minus aliquid sapiente sequi
                    cupiditate ex a dignissimos impedit fuga quisquam, quis
                    quaerat. Ullam, exercitationem! Temporibus, eius? Tenetur,
                    minima ullam. Nisi accusantium, non quas id aliquid fugit
                    similique sit eius doloremque nobis ex unde. Fugiat repellat
                    aperiam soluta recusandae ipsum autem voluptate iste dolore
                    quae molestiae dolores explicabo, sunt vitae earum
                    consequuntur adipisci quidem, mollitia sint animi! Ad fuga
                    porro laudantium, hic illo voluptas asperiores minus sunt,
                    quaerat distinctio, odit ipsa. Accusamus, suscipit?
                    Accusantium, quod! Consequuntur eaque quisquam nam quae sit
                    reprehenderit officiis sint numquam vel dolores perferendis
                    eius nemo tenetur, sapiente perspiciatis cumque atque?
                    Doloribus odit possimus pariatur magni a, accusamus atque
                    nesciunt numquam quas, omnis illum facilis soluta
                    perspiciatis! Dolorem omnis sint, eos earum eligendi error
                    vitae assumenda, optio qui, repudiandae debitis doloremque
                    dolores asperiores! Omnis, harum quasi consequuntur
                    voluptatem provident quaerat delectus enim vitae odit
                    officiis culpa officia maiores sunt nesciunt. Consequuntur
                    nobis molestias sit cum eius dicta consequatur harum, cumque
                    iure recusandae voluptate atque adipisci aspernatur odio
                    explicabo aliquam error deserunt officiis, quisquam quos
                    sint dolorem corrupti architecto? Aspernatur esse beatae
                    harum velit consectetur. Distinctio repellendus sapiente
                    consequatur ea, quis labore, optio impedit deserunt, culpa
                    vitae expedita eveniet repudiandae exercitationem a
                    blanditiis. Rem, quis cumque error quae rerum suscipit ad
                    aliquam provident quas consectetur iusto dicta sapiente quod
                    temporibus, non quam! Fugit odio unde ipsum neque, delectus
                    aperiam exercitationem distinctio illum cum recusandae natus
                    tempora nihil blanditiis ut ad similique provident ullam
                    eaque mollitia tenetur voluptas. Error sint, excepturi
                    beatae vero nemo sapiente architecto non est animi earum
                    eius pariatur modi, nisi inventore soluta, accusantium hic!
                    Odit dignissimos debitis perspiciatis corrupti at
                    reprehenderit quis minus quia ipsa aliquam obcaecati facere
                    molestiae nobis libero recusandae vero a, culpa nisi.
                  </Text>
                )}

                {/* Phase 3 */}
                {activeStep === 2 && (
                  <Text fontFamily='font.body' textAlign='justify'>
                    <span className='font-bold text-green-700'>Phase 3</span>{' '}
                    --- Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cum maiores repellendus officiis. Culpa nihil ad recusandae
                    adipisci aut, nulla eius! Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Iusto amet id adipisci fugit
                    ipsa dolor incidunt nulla, possimus deleniti, repudiandae
                    consectetur! Cumque, eaque. Voluptates placeat laborum
                    tenetur natus alias. Rerum adipisci odit harum? Laudantium
                    dicta facere nisi impedit modi unde. Inventore soluta ipsum
                    aspernatur, tempore rem laudantium nihil harum assumenda
                    praesentium exercitationem facere totam laborum, magni
                    possimus incidunt labore hic! Impedit veritatis laboriosam
                    quasi natus id porro possimus ipsam incidunt mollitia
                    corporis facere officia velit eaque officiis et hic quaerat
                    asperiores ullam, maxime perferendis. Dolorum cum laborum,
                    repellat odit error facere ea reprehenderit explicabo quas
                    laboriosam corporis vel ipsam tempore! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Officia eveniet nesciunt
                    iste, numquam, tempora minus deleniti id nemo quam magnam et
                    temporibus ducimus molestias impedit quasi at dolores
                    corrupti alias, unde maiores? Ex nemo laborum vitae at
                    eligendi obcaecati debitis praesentium beatae illo ratione.
                    Magni dignissimos ducimus nisi fuga laboriosam. Accusamus et
                    ut quisquam quas cupiditate alias quasi explicabo voluptates
                    corporis ullam excepturi dolorum, soluta dignissimos qui
                    neque ipsa tempora eaque quibusdam, animi eius fuga rem.
                    Odio nesciunt voluptas consectetur! Laudantium quis, tempore
                    officia corporis nihil aliquam sequi aspernatur deserunt sit
                    vero rem eveniet. Assumenda repudiandae delectus possimus
                    rerum eum esse, rem id incidunt? Sapiente, quas, fugit autem
                    nulla, similique adipisci quia sint eum amet unde
                    repellendus cum. Repudiandae itaque quas iure dolor nulla
                    aut ducimus dolorem, autem quaerat ipsam officiis nisi
                    nesciunt aliquam reiciendis necessitatibus vel vero sunt
                    dicta nam impedit facilis. Fugit perferendis adipisci
                    obcaecati assumenda ab dolorum sint, sequi quae explicabo,
                    aut incidunt, iste quia unde! Consequuntur sapiente, tempora
                    molestias non vitae, sunt nemo aut provident et quo aliquam
                    porro harum molestiae, eveniet deserunt recusandae voluptate
                    nobis ab eligendi atque dignissimos? Asperiores aut, quis
                    voluptatum magnam minus ad, natus, dolores porro debitis
                    voluptatibus odio laborum fugit accusamus repudiandae
                    laudantium amet deserunt labore? Ex mollitia perspiciatis
                    quam autem ad dignissimos exercitationem error consectetur
                    eius? Laboriosam, possimus minus aliquid sapiente sequi
                    cupiditate ex a dignissimos impedit fuga quisquam, quis
                    quaerat. Ullam, exercitationem! Temporibus, eius? Tenetur,
                    minima ullam. Nisi accusantium, non quas id aliquid fugit
                    similique sit eius doloremque nobis ex unde. Fugiat repellat
                    aperiam soluta recusandae ipsum autem voluptate iste dolore
                    quae molestiae dolores explicabo, sunt vitae earum
                    consequuntur adipisci quidem, mollitia sint animi! Ad fuga
                    porro laudantium, hic illo voluptas asperiores minus sunt,
                    quaerat distinctio, odit ipsa. Accusamus, suscipit?
                    Accusantium, quod! Consequuntur eaque quisquam nam quae sit
                    reprehenderit officiis sint numquam vel dolores perferendis
                    eius nemo tenetur, sapiente perspiciatis cumque atque?
                    Doloribus odit possimus pariatur magni a, accusamus atque
                    nesciunt numquam quas, omnis illum facilis soluta
                    perspiciatis! Dolorem omnis sint, eos earum eligendi error
                    vitae assumenda, optio qui, repudiandae debitis doloremque
                    dolores asperiores! Omnis, harum quasi consequuntur
                    voluptatem provident quaerat delectus enim vitae odit
                    officiis culpa officia maiores sunt nesciunt. Consequuntur
                    nobis molestias sit cum eius dicta consequatur harum, cumque
                    iure recusandae voluptate atque adipisci aspernatur odio
                    explicabo aliquam error deserunt officiis, quisquam quos
                    sint dolorem corrupti architecto? Aspernatur esse beatae
                    harum velit consectetur. Distinctio repellendus sapiente
                    consequatur ea, quis labore, optio impedit deserunt, culpa
                    vitae expedita eveniet repudiandae exercitationem a
                    blanditiis. Rem, quis cumque error quae rerum suscipit ad
                    aliquam provident quas consectetur iusto dicta sapiente quod
                    temporibus, non quam! Fugit odio unde ipsum neque, delectus
                    aperiam exercitationem distinctio illum cum recusandae natus
                    tempora nihil blanditiis ut ad similique provident ullam
                    eaque mollitia tenetur voluptas. Error sint, excepturi
                    beatae vero nemo sapiente architecto non est animi earum
                    eius pariatur modi, nisi inventore soluta, accusantium hic!
                    Odit dignissimos debitis perspiciatis corrupti at
                    reprehenderit quis minus quia ipsa aliquam obcaecati facere
                    molestiae nobis libero recusandae vero a, culpa nisi.
                  </Text>
                )}

                {/* Phase 4 */}
                {activeStep === 3 && (
                  <Text fontFamily='font.body' textAlign='justify'>
                    <span className='font-bold text-green-700'>Phase 4</span>{' '}
                    --- Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cum maiores repellendus officiis. Culpa nihil ad recusandae
                    adipisci aut, nulla eius! Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Iusto amet id adipisci fugit
                    ipsa dolor incidunt nulla, possimus deleniti, repudiandae
                    consectetur! Cumque, eaque. Voluptates placeat laborum
                    tenetur natus alias. Rerum adipisci odit harum? Laudantium
                    dicta facere nisi impedit modi unde. Inventore soluta ipsum
                    aspernatur, tempore rem laudantium nihil harum assumenda
                    praesentium exercitationem facere totam laborum, magni
                    possimus incidunt labore hic! Impedit veritatis laboriosam
                    quasi natus id porro possimus ipsam incidunt mollitia
                    corporis facere officia velit eaque officiis et hic quaerat
                    asperiores ullam, maxime perferendis. Dolorum cum laborum,
                    repellat odit error facere ea reprehenderit explicabo quas
                    laboriosam corporis vel ipsam tempore! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Officia eveniet nesciunt
                    iste, numquam, tempora minus deleniti id nemo quam magnam et
                    temporibus ducimus molestias impedit quasi at dolores
                    corrupti alias, unde maiores? Ex nemo laborum vitae at
                    eligendi obcaecati debitis praesentium beatae illo ratione.
                    Magni dignissimos ducimus nisi fuga laboriosam. Accusamus et
                    ut quisquam quas cupiditate alias quasi explicabo voluptates
                    corporis ullam excepturi dolorum, soluta dignissimos qui
                    neque ipsa tempora eaque quibusdam, animi eius fuga rem.
                    Odio nesciunt voluptas consectetur! Laudantium quis, tempore
                    officia corporis nihil aliquam sequi aspernatur deserunt sit
                    vero rem eveniet. Assumenda repudiandae delectus possimus
                    rerum eum esse, rem id incidunt? Sapiente, quas, fugit autem
                    nulla, similique adipisci quia sint eum amet unde
                    repellendus cum. Repudiandae itaque quas iure dolor nulla
                    aut ducimus dolorem, autem quaerat ipsam officiis nisi
                    nesciunt aliquam reiciendis necessitatibus vel vero sunt
                    dicta nam impedit facilis. Fugit perferendis adipisci
                    obcaecati assumenda ab dolorum sint, sequi quae explicabo,
                    aut incidunt, iste quia unde! Consequuntur sapiente, tempora
                    molestias non vitae, sunt nemo aut provident et quo aliquam
                    porro harum molestiae, eveniet deserunt recusandae voluptate
                    nobis ab eligendi atque dignissimos? Asperiores aut, quis
                    voluptatum magnam minus ad, natus, dolores porro debitis
                    voluptatibus odio laborum fugit accusamus repudiandae
                    laudantium amet deserunt labore? Ex mollitia perspiciatis
                    quam autem ad dignissimos exercitationem error consectetur
                    eius? Laboriosam, possimus minus aliquid sapiente sequi
                    cupiditate ex a dignissimos impedit fuga quisquam, quis
                    quaerat. Ullam, exercitationem! Temporibus, eius? Tenetur,
                    minima ullam. Nisi accusantium, non quas id aliquid fugit
                    similique sit eius doloremque nobis ex unde. Fugiat repellat
                    aperiam soluta recusandae ipsum autem voluptate iste dolore
                    quae molestiae dolores explicabo, sunt vitae earum
                    consequuntur adipisci quidem, mollitia sint animi! Ad fuga
                    porro laudantium, hic illo voluptas asperiores minus sunt,
                    quaerat distinctio, odit ipsa. Accusamus, suscipit?
                    Accusantium, quod! Consequuntur eaque quisquam nam quae sit
                    reprehenderit officiis sint numquam vel dolores perferendis
                    eius nemo tenetur, sapiente perspiciatis cumque atque?
                    Doloribus odit possimus pariatur magni a, accusamus atque
                    nesciunt numquam quas, omnis illum facilis soluta
                    perspiciatis! Dolorem omnis sint, eos earum eligendi error
                    vitae assumenda, optio qui, repudiandae debitis doloremque
                    dolores asperiores! Omnis, harum quasi consequuntur
                    voluptatem provident quaerat delectus enim vitae odit
                    officiis culpa officia maiores sunt nesciunt. Consequuntur
                    nobis molestias sit cum eius dicta consequatur harum, cumque
                    iure recusandae voluptate atque adipisci aspernatur odio
                    explicabo aliquam error deserunt officiis, quisquam quos
                    sint dolorem corrupti architecto? Aspernatur esse beatae
                    harum velit consectetur. Distinctio repellendus sapiente
                    consequatur ea, quis labore, optio impedit deserunt, culpa
                    vitae expedita eveniet repudiandae exercitationem a
                    blanditiis. Rem, quis cumque error quae rerum suscipit ad
                    aliquam provident quas consectetur iusto dicta sapiente quod
                    temporibus, non quam! Fugit odio unde ipsum neque, delectus
                    aperiam exercitationem distinctio illum cum recusandae natus
                    tempora nihil blanditiis ut ad similique provident ullam
                    eaque mollitia tenetur voluptas. Error sint, excepturi
                    beatae vero nemo sapiente architecto non est animi earum
                    eius pariatur modi, nisi inventore soluta, accusantium hic!
                    Odit dignissimos debitis perspiciatis corrupti at
                    reprehenderit quis minus quia ipsa aliquam obcaecati facere
                    molestiae nobis libero recusandae vero a, culpa nisi.
                  </Text>
                )}
              </ScrollArea>
            </CardBody>
          </Card>
          <ViolationBylaws />
        </Box>
      </Flex>
    </div>
  )
}
