import React, { useState, useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import Plus from '../images/svg/plus'

const button_variant = {
    active: {
        rotate: [0, 316],
        translateY: [0, -6, 0],
        scale: [1, 0.85, 1],
        transition: { duration: 0.6, ease: 'easeInOut' }
    },
    inactive: { rotate: [316, 0], translateY: [0, 6, 0], transition: { duration: 0.6 } }
    // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
    // stop: { y: [0, -10, 0], transition: { repeat: Infinity, repeatDelay: 3 } }
}

const first_selector_variant = {
    active: {
        translateY: [0, 80],
        scaleY: [1.8, 1],
        transition: { duration: 1.2 }
    }
}

const second_selector_variant = {
    active: {
        translateY: [80, 140],
        scaleY: [0, 1],
        transition: { duration: 1.6, delay: 0.3 }
    }
}
const third_selector_variant = {
    active: {
        translateY: [80, 200],
        scaleY: [0, 1],
        transition: { duration: 1.6, delay: 0.6 }
    }
}
const fourth_selector_variant = {
    active: {
        translateY: [80, 260],
        scaleY: [0, 1],
        transition: { duration: 1.6, delay: 0.9 }
    }
}
const fifth_selector_variant = {
    active: {
        translateY: [80, 320],
        scaleY: [0, 1],
        transition: { duration: 1.6, delay: 1.2 }
    }
}

const IndexPage = () => {
    const [items, setItems] = useState<string[]>([])
    const [random, setRandom] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [animation_state, setAnimationState] = useState<string>('idle')
    const [bg, setBg] = useState<string>('bg-gray-100')
    let counter = 0

    const borderColors = [
        'border-red-300',
        'border-green-300',
        'border-blue-300',
        'border-yellow-300',
        'border-purple-300',
        'border-pink-300',
        'border-indigo-300'
    ]
    const bgColors = [
        'hover:bg-red-300',
        'hover:bg-green-300',
        'hover:bg-blue-300',
        'hover:bg-yellow-300',
        'hover:bg-purple-300',
        'hover:bg-pink-300',
        'hover:bg-indigo-300'
    ]
    const makeRepeated = (arr: string[], repeats: number) =>
        Array.from({ length: repeats }, () => arr).flat()
    const borderColorsArray = makeRepeated(borderColors, 10)
    const bgColorsArray = makeRepeated(bgColors, 10)

    const addItems = () => {
        if (text) {
            setItems([...items, text])
        }
        setText('')
    }

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && text) {
            setItems([...items, text])
            setText('')
        }
    }

    const handleRandomize = () => {
        setRandom(items[Math.floor(Math.random() * items.length)])
    }

    const handleReset = () => {
        setItems([])
        setText('')
        setRandom('')
    }

    const handleDelete = (e: any) => {
        setItems(items.filter((item) => item !== e.target.innerHTML))
    }

    const handleButtonClick = () => {
        if (animation_state === 'idle') {
            setAnimationState('active')
        }
        if (animation_state === 'active') {
            setAnimationState('inactive')
        }
        if (animation_state === 'inactive') {
            setAnimationState('active')
        } else return
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
            <div className={`min-h-screen ${bg} flex items-center transition-colors duration-300`}>
                <div className="min-h-screen bg-white w-24 py-6 flex flex-col justify-between items-center shadow-lg">
                    <div className="notes-container flex flex-col items-center">
                        <div className="add-button flex justify-center">
                            <motion.button
                                id="addNote"
                                className="rounded-full bg-black h-14 w-14 relative flex justify-center items-center cursor-pointer"
                                onClick={handleButtonClick}
                                variants={button_variant}
                                animate={animation_state}
                            >
                                <Plus className="w-7 h-7" />
                            </motion.button>
                        </div>
                        <div className="note-selectors flex justify-center relative z-11 -mt-8">
                            <motion.div
                                className="selector first bg-yellow-200 z-10"
                                data-from="0"
                                data-to="80"
                                variants={first_selector_variant}
                                animate={animation_state}
                                onClick={() => setBg('bg-yellow-100')}
                            ></motion.div>
                            <motion.div
                                className="selector second other bg-red-200 z-9"
                                data-from="100"
                                data-to="140"
                                variants={second_selector_variant}
                                animate={animation_state}
                                onClick={() => setBg('bg-red-100')}
                            ></motion.div>
                            <motion.div
                                className="selector third other bg-purple-200 z-8"
                                data-from="160"
                                data-to="200"
                                variants={third_selector_variant}
                                animate={animation_state}
                                onClick={() => setBg('bg-purple-100')}
                            ></motion.div>
                            <motion.div
                                className="selector fourth other bg-blue-200 z-7"
                                data-from="220"
                                data-to="260"
                                variants={fourth_selector_variant}
                                animate={animation_state}
                                onClick={() => setBg('bg-blue-100')}
                            ></motion.div>
                            <motion.div
                                className="selector fifth other bg-gray-200 z-6"
                                data-from="280"
                                data-to="320"
                                variants={fifth_selector_variant}
                                animate={animation_state}
                                onClick={() => setBg('bg-gray-100')}
                            ></motion.div>
                        </div>
                    </div>
                </div>
                <svg id="gooey-filter" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="gooey-effect">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                                result="gooey-effect"
                            />
                            <feComposite in="SourceGraphic" in2="gooey-effect" operator="atop" />
                        </filter>
                    </defs>
                </svg>
                <div className="w-full min-h-screen py-16 flex justify-center">
                    <div className="flex flex-col w-3/4 max-w-sm justify-start items-center">
                        <h1 className="text-xl mb-10 relative">
                            Randomizer! <div className="inline-block w-auto animate-bounce">👇</div>
                        </h1>
                        <div className="flex justify-center flex-wrap mb-2">
                            {items.map((item: {}) => {
                                counter++
                                return (
                                    <div
                                        key={counter}
                                        className={`${borderColorsArray[counter]} border-2 rounded-lg px-4 py-2 mb-2 mr-2 cursor-pointer ${bgColorsArray[counter]}`}
                                        onClick={handleDelete}
                                    >
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                        <input
                            id="item-input"
                            className="rounded-lg h-10 my-6 w-full p-4"
                            placeholder="Insert item here"
                            onChange={({ target }) => setText(target.value)}
                            value={text}
                        />
                        <div className="flex flex-wrap justify-between my-8">
                            <button
                                className="mb-2 mx-1 px-8 py-3 bg-blue-300 rounded-lg hover:bg-blue-400 hover:text-white transition-colors	duration-300"
                                onClick={addItems}
                            >
                                Add
                            </button>
                            <button
                                className="mb-2 mx-1 px-8 py-3 bg-green-300 rounded-lg hover:bg-green-400 hover:text-white transition-colors	duration-300"
                                onClick={handleRandomize}
                            >
                                Randomize
                            </button>
                            <button
                                className="mb-2 mx-1 px-8 py-3 bg-red-300 rounded-lg hover:bg-red-400 hover:text-white transition-colors	duration-300"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>
                        {random && (
                            <>
                                <div className="text-4xl px-4 py-2 mb-4">
                                    {random.toUpperCase()}
                                </div>
                                <div className="flex" ref={animation_container}></div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
