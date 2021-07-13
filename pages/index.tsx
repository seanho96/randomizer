import { useState, useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import Layout from '../components/Layout'

const IndexPage = () => {
  const [items, setItems] = useState<IItems[]>([])
  const [random, setRandom] = useState<string>('')
  const [text, setText] = useState<string>('')

  interface IItems {
    items: string[]
  }


  const borderColors = ['border-red-300', 'border-green-300', 'border-blue-300', 'border-yellow-300', 'border-orange-300', 'border-purple-300', 'border-pink-300', 'border-indigo-300']
  const makeRepeated = (arr, repeats) => Array.from({ length: repeats }, () => arr).flat();
  const borderColorsArray = makeRepeated(borderColors, 10)

  const addItems = () => {
    if(text) {
      setItems(items.concat(text))
    }
    setText('')
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13 && text) {
        setItems(items.concat(text))
        setText('')
    }
}

  const handleRandomize = () => {
    setRandom(items[Math.floor(Math.random() * items.length)])
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEnter, false)

    return () => {
        document.removeEventListener('keydown', handleEnter, false)
    }
  }, [text])

  const animation_container = useRef()
  useEffect(() => {
      const anim = lottie.loadAnimation({
          container: animation_container.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'https://assets1.lottiefiles.com/datafiles/3RKIaYNZqu6RrV0/data.json'
      })
      return () => anim.destroy()
  }, [random])

  return (
    <Layout title="Randomizer">
      <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-start items-center">
        <div className="flex flex-col w-3/4 max-w-sm justify-start items-center">
          <h1 className="text-xl mb-10 relative">Randomizer! <div className="inline-block w-auto animate-bounce">👇</div></h1>
          <div className="flex justify-center flex-wrap mb-2">
          {items.map((item, idx) => {
            return (
            <div key={idx} className={`${borderColorsArray[idx]} border-2 rounded-lg px-4 py-2 mb-2 mr-2`}>{item}</div>
          )})}
          </div>
          <input id="item-input" className="rounded-lg h-10 my-6 w-full p-4" placeholder="Insert item here" onChange={({ target }) => setText(target.value)} value={text}/>
          <div className="flex">
            <button className="my-8 mr-4 px-8 py-3 bg-blue-100 rounded-lg hover:bg-blue-300 hover:text-white transition-colors	duration-300" onClick={addItems}>
                Add
            </button>
            <button className="my-8 px-8 py-3 bg-red-100 rounded-lg hover:bg-red-300 hover:text-white transition-colors	duration-300" onClick={handleRandomize}>
                Randomize
            </button>
          </div>
          {random && (
            <>
              <div className="text-4xl px-4 py-2 mb-4">{random.toUpperCase()}</div>
              <div className="flex" ref={animation_container}></div>
            </>
          )}
          </div>
      </div>
    </Layout>
)}

export default IndexPage
