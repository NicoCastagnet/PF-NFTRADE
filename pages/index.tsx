import Footer from '@components/footer'
import AboutHome from '@components/home/aboutHome'
import UtilsContainer from '@components/home/contentUtils/utilsContainer'
import FaqHome from '@components/home/faqHome'
import HeaderContainer from '@components/home/headerContainer'
import NewsLetter from '@components/home/newsLetter'
import TopContainer from '@components/home/topContainer'
import NavBar from '@components/navbar/navbar'
import { getAllNfts } from '@lib/api'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import type { NftsResponse } from 'types/api-responses'

interface HomeProps {
  nfts: NftsResponse
}

const HomePage: NextPage<HomeProps> = ({ nfts }) => {
  return (
    <div className="home__container flex flex-col items-center justify-center content-center w-full min">
      <Head>
        <title>NFTrade | Home</title>
      </Head>
      <NavBar />
      <HeaderContainer />
      <UtilsContainer />
      <AboutHome />
      <TopContainer nfts={nfts} />
      <NewsLetter />
      <FaqHome />
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nfts = await getAllNfts({ limit: 3, order: 'likes_desc' })
  return {
    props: { nfts },
  }
}

export default HomePage
