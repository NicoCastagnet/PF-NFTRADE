import SvgChevronDown from '@components/icons/svgChevronDown'
import SvgQuestionMark from '@components/icons/svgQuestionMark'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react'
import { Fragment, useState } from 'react'

const UtilsContainer = () => {
  const [open, setOpen] = useState(0)

  const handleOpen = (val: number) => {
    setOpen(open === val ? 0 : val)
  }

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  }

  function Icon({ id, open }: { id: number; open: number }) {
    return (
      <SvgChevronDown
        className={`${
          id === open ? 'rotate-180' : ''
        } h-5 w-5 transition-transform`}
      />
    )
  }

  return (
    <section className="home__faq flex flex-col items-center m-14 max-md:m-8">
      <div className="home__top-titles flex flex-col text-center m-16 max-md:mx-8 max-md:my-0">
        <p className="text-5xl font-bold tracking-wide max-md:text-2xl">
          Frequently <span className="font-extrabold text-blue-600">asked</span>{' '}
          questions
        </p>
        <p className="m-5 text-lg text-gray-500 max-md:text-sm">
          Everything you need to know about the product and billing.
        </p>
      </div>
      <div className="mb-16 max-md:m-8 max-md:my-0 max-sm:mx-2">
        <Fragment>
          <Accordion
            className=" w-full max-w-[50rem]"
            open={open === 1}
            animate={customAnimation}
            icon={<Icon id={1} open={open} />}
          >
            <AccordionHeader onClick={() => handleOpen(1)}>
              <div className="flex items-center text-1xl max-sm:text-base">
                <SvgQuestionMark className="fill-gray-700 w-6 h-6 mr-2 shrink-0" />
                What is NFTrade?
              </div>
            </AccordionHeader>
            <AccordionBody className="text-[15px]">
              NFTrade is a project made by a group of 8 students of{' '}
              <a
                href="https://www.soyhenry.com"
                target="_blank"
                rel="noreferrer"
                className="underline text-blue-600"
              >
                Henry Bootcamp
              </a>
              . The poject was based on creating an NFT Marketplace using
              Next.JS, TypeScript, Tailwind, PostgreSQL & Prisma inplementing
              Stripe API as payments platform.
            </AccordionBody>
          </Accordion>
          <Accordion
            className="w-full max-w-[50rem]"
            open={open === 2}
            animate={customAnimation}
            icon={<Icon id={2} open={open} />}
          >
            <AccordionHeader onClick={() => handleOpen(2)}>
              <div className="flex items-center text-1xl max-sm:text-base">
                <SvgQuestionMark className="fill-gray-700 w-6 h-6 mr-2 shrink-0" />
                What is an NFT?
              </div>
            </AccordionHeader>
            <AccordionBody className="text-[15px]">
              A non-fungible token (NFT) is a unique digital identifier that
              cannot be copied, substituted, or subdivided, that is recorded in
              a blockchain, and that is used to certify authenticity and
              ownership. The ownership of an NFT is recorded in the blockchain
              and can be transferred by the owner, allowing NFTs to be sold and
              traded.
            </AccordionBody>
          </Accordion>
          <Accordion
            className="w-full max-w-[50rem]"
            open={open === 3}
            animate={customAnimation}
            icon={<Icon id={3} open={open} />}
          >
            <AccordionHeader onClick={() => handleOpen(3)}>
              <div className="flex items-center text-1xl max-sm:text-base">
                <SvgQuestionMark className="fill-gray-700 w-6 h-6 mr-2 shrink-0" />
                How can i buy an NFT?
              </div>
            </AccordionHeader>
            <AccordionBody className="text-[15px]">
              First you must create an account, then buy credits joining into
              the dashboard. Finally, start exploring the marketplace and buy
              your NFT&apos;s!
            </AccordionBody>
          </Accordion>
        </Fragment>
      </div>
    </section>
  )
}

export default UtilsContainer
