import { useState, useEffect } from 'react'
import levelOne from './utils/level-one.json'
import levelTwo from './utils/level-two.json'
import levelThree from './utils/level-three.json'
import Card from './components/Card'
import { CardType } from './types'
import Confetti from 'react-confetti'

function App() {
	const [level, setLevel] = useState<CardType[]>(levelOne as CardType[])
	const [cards, setCards] = useState<CardType[]>([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState<CardType | null>(null)
	const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null)
	const [disabled, setDisabled] = useState(false)
	const [showWinPopup, setShowWinPopup] = useState(false)
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	})

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
			<div className='container flex flex-col md:flex-row md:justify-between md:items-end items-center gap-4 border-b-2 border-white-100/20 py-space-s'>
				<div className='text-center md:text-left pb-6 md:pb-0'>
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
				<div className=' text-white-100'>
					<label htmlFor='level' className='mr-2'>
						Level:
					</label>
					<select
						id='level'
						className='bg-black-300 border border-gray-300 rounded-md p-2'
						onChange={handleDifficultyChange}
					>
						<option value='one'>One</option>
						<option value='two'>Two</option>
						<option value='three'>Three</option>
					</select>
				</div>
			</div>
			<div className='grid grid-cols-4 lg:grid-cols-8 gap-4 py-space-2xl'>
				{cards && cards.length > 0 ? (
					cards.map((card) => (
						<Card
							key={card.id}
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
						/>
					))
				) : (
					<p className='col-span-5 text-center'>
						Click the "New Game" button to get started!
					</p>
				)}
			</div>
			<div className='flex justify-between items-center fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl py-space-2xs px-space-m bg-black-300/75 backdrop-blur-sm space-x-4'>
				<p className='inline text-step-1'>Turns: {turns}</p>
				<button
					className='bg-green-100/60 text-black-300 font-black px-space-s py-space-2xs rounded-lg hover:bg-green-100 transition-all duration-300 ease-in-out'
					onClick={shuffleCards}
				>
					New Game
				</button>
			</div>

			{showWinPopup && (
				<div className='fixed inset-0 flex items-center justify-center bg-black-300/50 backdrop-blur-sm'>
					<Confetti
						width={windowSize.width}
						height={windowSize.height}
					/>
					<div className='inset-28 p-space-2xl rounded-lg text-center bg-black-200'>
						<p className='text-step-5'>&#127881;</p>
						<h2 className='text-step-2 font-bold mb-4'>
							Nicely done!
						</h2>
						<p className='mb-4'>Turns taken: {turns}</p>
						<button
							className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300'
							onClick={() => shuffleCards()}
						>
							Play Again
						</button>
					</div>
				</div>
			)}
		</main>
	)
}

export default App
