import Footer from '@components/footer'
import AboutHome from '@components/home/aboutHome'
import HeaderContainer from '@components/home/headerContainer'
import NewLetter from '@components/home/newLetter'
import TopContainer from '@components/home/topContainer'
import UtilsContainer from '@components/home/contentUtils/utilsContainer'
// import Carrucel from '@components/home/contentUtils/carrucel'
import NavBar from '@components/navbar/navbar'
import { getAllNfts } from '@lib/api'
import type { GetServerSideProps, NextPage } from 'next'
import type { NftsResponse } from 'types/api-responses'

interface HomeProps {
  nfts: NftsResponse
}

const HomePage: NextPage<HomeProps> = ({ nfts }) => {
  return (
    <div className="home__container flex flex-col items-center justify-center content-center w-full min">
      {/* ---------------------- */}
      <NavBar />
      {/* ---------------------- */}
      <HeaderContainer />
      {/* ---------------------- */}
      <UtilsContainer />
      {/* ---------------------- */}
      <AboutHome />
      {/* ---------------------- */}
      <TopContainer nfts={nfts} />
      {/* ---------------------- */}
      <NewLetter />
      {/* ---------------------- */}
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
