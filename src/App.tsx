import { useState, useEffect } from 'react'
import levelOne from './utils/level-one.json'
import levelTwo from './utils/level-two.json'
import levelThree from './utils/level-three.json'
import Card from './components/Card'
import { CardType } from './types'
import Confetti from 'react-confetti'
import { motion } from 'framer-motion'
import Settings from './components/Settings'

function App() {
	const [level, setLevel] = useState<CardType[]>(levelOne as CardType[])
	const [cards, setCards] = useState<CardType[]>([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState<CardType | null>(null)
	const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null)
	const [disabled, setDisabled] = useState(false)
	const [showWinPopup, setShowWinPopup] = useState(false)
	const [showSettings, setShowSettings] = useState(false)
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	})
	const [cardBack, setCardBack] = useState('card-back-5.svg')

	const handleCardBackChange = (src: string) => {
		setCardBack(src)
	}

	const closeSettings = () => {
		setShowSettings(false)
	}

	const handleWindowResize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}

	const shuffleCards = () => {
		const selectedCards = level.sort(() => 0.5 - Math.random()).slice(0, 12)
		const shuffledCards = [...selectedCards, ...selectedCards]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random(), matched: false }))
		setChoiceOne(null)
		setChoiceTwo(null)
		setCards(shuffledCards)
		setTurns(0)
		setShowWinPopup(false)
	}

	const handleChoice = (card: CardType) => {
		if (card.id === choiceOne?.id) return
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	const handleDifficultyChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const difficulty = e.target.value
		switch (difficulty) {
			case 'one':
				setLevel(levelOne as CardType[])
				break
			case 'two':
				setLevel(levelTwo as CardType[])
				break
			case 'three':
				setLevel(levelThree as CardType[])
				break
			default:
				setLevel(levelOne as CardType[])
		}
	}

	useEffect(() => {
		window.onresize = () => handleWindowResize()
	}, [windowSize])

	useEffect(() => {
		shuffleCards()
	}, [level])

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true)
			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true }
						} else {
							return card
						}
					})
				})
				resetTurn()
			} else {
				setTimeout(() => resetTurn(), 1000)
			}
		}
	}, [choiceOne, choiceTwo])

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns((prevTurns) => prevTurns + 1)
		setDisabled(false)
	}

	useEffect(() => {
		shuffleCards()
	}, [])

	useEffect(() => {
		if (cards.length > 0 && cards.every((card) => card.matched)) {
			handleWindowResize()
			setTimeout(() => setShowWinPopup(true), 500)
		}
	}, [cards])

	return (
		<main className='max-w-screen-2xl mx-auto px-space-s'>
			<div className='container flex flex-col md:flex-row md:justify-between gap-4 border-b-2 border-white-100/20 py-space-s'>
				<div className='pb-6 md:pb-0'>
					<h1 className='text-step-3 space-x-2'>
						{/* <span>&#129413;</span> */}
						<span className='font-black'>Eagle Eyes</span>
						<span className='inline-block -scale-x-1'>
							{' '}
							&#129413;
						</span>
					</h1>
					<p>A memory game for the detail obsessed.</p>
				</div>
				<div className=' text-white-100 w-full flex md:flex-col md:w-52 justify-between items-end gap-4'>
					<button
						className='max-h-12 border-2 border-white-100/60 px-space-s py-space-2xs rounded-lg hover:border-white-100 transition-all duration-300 ease-in-out'
						onClick={() => {
							setShowSettings(true)
						}}
					>
						Settings
					</button>
					<div>
						<label htmlFor='level' className='block text-step--1'>
							Level:
						</label>
						<select
							id='level'
							className='bg-black-300 border-2 border-white-100/60 px-space-s py-space-2xs rounded-lg hover:border-white-100 transition-all duration-300 ease-in-out hover:cursor-pointer'
							onChange={handleDifficultyChange}
						>
							<option className='py-space-s' value='one'>
								Geometric Shapes
							</option>
							<option value='two'>Organic Shapes</option>
							<option value='three'>Fonts</option>
						</select>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-4 lg:grid-cols-8 gap-4 py-space-2xl'>
				{cards && cards.length > 0 ? (
					cards.map((card, i) => (
						<motion.div
							key={card.id}
							initial={{
								opacity: 0,
								translateX: -50,
								translateY: -50,
							}}
							animate={{
								opacity: 1,
								translateX: 0,
								translateY: 0,
							}}
							transition={{ duration: 0.12, delay: i * 0.1 }}
						>
							<Card
								src={card.src}
								level={card.level}
								id={card.id}
								handleChoice={handleChoice}
								flipped={
									card.id === choiceOne?.id ||
									card.id === choiceTwo?.id ||
									card.matched
								}
								disabled={disabled}
								cardBack={cardBack}
							/>
						</motion.div>
					))
				) : (
					<p className='col-span-5 text-center'>
						Click the "New Game" button to get started!
					</p>
				)}
			</div>
			<div className='flex justify-between items-center fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl py-space-2xs px-space-m bg-black-300/75 backdrop-blur-sm space-x-4 rounded-lg'>
				<p className='inline text-step-1'>Turns: {turns}</p>
				<button
					className='bg-green-100/60 text-black-300 font-black px-space-s py-space-2xs rounded-lg hover:bg-green-100 transition-all duration-300 ease-in-out'
					onClick={shuffleCards}
				>
					New Game
				</button>
			</div>

			{showWinPopup && (
				<div className='fixed inset-0 bg-black-300/50 backdrop-blur-sm flex flex-col justify-center items-center'>
					<Confetti
						width={windowSize.width}
						height={windowSize.height}
					/>
					<div className='max-w-screen-sm md:p-space-2xl p-space-m rounded-lg bg-black-200 border-2 border-green-100/75'>
						<div className='flex flex-col gap-8 justify-center mx-auto text-center h-full'>
							<p className='text-step-3 font-black leading-none'>
								Winner Winner
								<span className='text-step-5'>
									&#x1F414; &#x1F37D;
								</span>
							</p>
							<div className='rounded-md px-space-s py-space-l space-y-4 bg-black-300/50'>
								<p className='text-step--1 font-bold'>
									Number of Turns:
								</p>
								<span className='inline-block ml-2 p-space-s border-4 border-white-100/75 rounded-md text-step-5 font-black'>
									{turns}
								</span>
							</div>

							<button
								className='bg-green-100/60 text-black-300 font-black px-space-s py-space-2xs rounded-lg hover:bg-green-100 transition-all duration-300 ease-in-out'
								onClick={() => shuffleCards()}
							>
								Play Again
							</button>
						</div>
					</div>
				</div>
			)}
			{showSettings && (
				<Settings
					onClose={closeSettings}
					onCardBackChange={handleCardBackChange}
				/>
			)}
		</main>
	)
}

export default App
