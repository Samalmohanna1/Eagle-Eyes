import { useState } from 'react'
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

	const shuffleCards = () => {
		const shuffledCards = [...level, ...level]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }))
		setCards(shuffledCards)
		setTurns(0)
	}

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
			<div className='py-space-l text-center'>
				<button
					className='bg-green-100/60 text-black-300 font-black px-space-m py-space-s rounded-lg hover:bg-green-100 transition-all duration-300 ease-in-out'
					onClick={shuffleCards}
				>
					New Game
				</button>
			</div>
			<div className='grid grid-cols-5 gap-4 py-space-2xl'>
				{cards && cards.length > 0 ? (
					cards.map((card) => (
						<Card
							key={card.id}
							src={card.src}
							level={card.level}
							id={card.id}
						/>
					))
				) : (
					<p>No images available</p>
				)}
			</div>
		</main>
	)
}

export default App
