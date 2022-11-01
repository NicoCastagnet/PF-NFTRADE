import Footer from '@components/footer'
import AboutHome from '@components/home/aboutHome'
import FaqHome from '@components/home/faqHome'
import HeaderContainer from '@components/home/headerContainer'
import NewLetter from '@components/home/newLetter'
import TopContainer from '@components/home/topContainer'
import UtilsContainer from '@components/home/utilsContainer'
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
      <NavBar />
      {/* ---------------------- */}
      <section className="bg-slate-900  w-full flex justify-center items-center">
        <HeaderContainer />
      </section>

      {/* ---------------------- */}

      <UtilsContainer />

      {/* ---------------------- */}

      <AboutHome />

      {/* ---------------------- */}

      <TopContainer nfts={nfts} />

      {/* ---------------------- */}

      <NewLetter />

      {/* ---------------------- */}

      <FaqHome />

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
