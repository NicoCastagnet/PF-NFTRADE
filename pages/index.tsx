import Footer from '@components/footer'
import AboutHome from '@components/home/aboutHome'
import HeaderContainer from '@components/home/headerContainer'
import NewLetter from '@components/home/newLetter'
import TopContainer from '@components/home/topContainer'
import UtilsContainer from '@components/home/utilsContainer'
import NavBar from '@components/navbar/navbar'
import fetcher from '@lib/fetcher'
import type { GetServerSideProps, NextPage } from 'next'
import useSWR from 'swr'
import type { NftsResponse } from 'types/api-responses'

const URL = 'http://localhost:3000/api/nfts?limit=3&order=likes_desc'

interface HomeProps {
  fallbackData: NftsResponse
}

const HomePage: NextPage<HomeProps> = ({ fallbackData }) => {
  const { data: nfts } = useSWR<NftsResponse>(URL, fetcher, {
    fallbackData,
  })

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

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(URL)
  return {
    props: { fallbackData: data || {} },
  }
}

export default HomePage
