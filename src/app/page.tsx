import Clock from '@/components/Clock'
import LineInformation from '@/components/LineInformation'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-center w-full sm:w-[500px] sm:mt-[5vh]">
      <section className="flex flex-row justify-between items-center w-full">
        <Image alt="TfL-logo" src={'/tfl_text.png'} height={50} width={180} />
        <Clock/>
      </section>
      <LineInformation />
    </main>
  )
}
