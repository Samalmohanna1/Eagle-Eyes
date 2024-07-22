import { useState, useEffect } from 'react'
import levelOne from './utils/level-one.json'
import levelTwo from './utils/level-two.json'
import Card from './components/card'
import { CardType } from './types'

function App() {
	const [level, setLevel] = useState<CardType[]>(levelOne as CardType[])
	const [cards, setCards] = useState<CardType[]>([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState<CardType | null>(null)
	const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null)
	const [disabled, setDisabled] = useState(false)

	const shuffleCards = () => {
		//TODO: grab 10 or 15 out of the level the create the deck
		const shuffledCards = [...level, ...level]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random(), matched: false }))
		setChoiceOne(null)
		setChoiceTwo(null)
		setCards(shuffledCards)
		setTurns(0)
	}

	const handleChoice = (card: CardType) => {
		if (card.id === choiceOne?.id) return
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	useEffect(() => {
		console.log('choices: ', choiceOne, choiceTwo)
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

	return (
		<main className='max-w-screen-lg mx-auto'>
			<div className='container text-center border-b-2 border-white-100/20 pb-4'>
				<h1 className='text-step-4 space-x-2'>
					<span>&#129413;</span>
					<span className='text-step-5 font-black'>Eagle Eyes</span>
					<span className='inline-block -scale-x-1'> &#129413;</span>
				</h1>
				<p className='read-the-docs'>
					A memory game for the detail obsessed.
				</p>
			</div>
			<div className='grid grid-cols-3 md:grid-cols-5 gap-4 py-space-2xl px-space-s'>
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
			<div className='sticky flex justify-between items-center bottom-0 w-full py-space-2xs px-space-m bg-black-300/75 space-x-4'>
				<p className='inline text-step-1'>Turns: {turns}</p>
				<button
					className='bg-green-100/60 text-black-300 font-black px-space-s py-space-2xs rounded-lg hover:bg-green-100 transition-all duration-300 ease-in-out'
					onClick={shuffleCards}
				>
					New Game
				</button>
			</div>
		</main>
	)
}

export default App
