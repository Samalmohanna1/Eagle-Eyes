import React from 'react'
import { CardType } from '../types'

interface CardProps {
	src: string
	level: string
	id: number
	handleChoice: (card: CardType) => void
	flipped: boolean
	disabled: boolean
}

const Card: React.FC<CardProps> = ({
	src,
	level,
	id,
	handleChoice,
	flipped,
	disabled,
}) => {
	const card = { src, level, id, matched: false, flipped, disabled }
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card)
			console.log('card clicked.', card)
		} else {
			console.log('card disabled.')
		}
	}

	return (
		// <div className='relative w-32 h-32'>
		// 	<div
		// 		className={`relative w-full h-full transition-transform transform ${
		// 			flipped ? 'rotate-y-180' : ''
		// 		}`}
		// 	>
		// 		<div className='absolute w-full h-full backface-hidden'>
		// 			<img
		// 				className='w-full h-full rounded-xl border-2 border-white-100/20 transition-all duration-300 ease-in-out'
		// 				src={`/assets/${level}/${src}`}
		// 				alt={src}
		// 			/>
		// 		</div>
		// 		<div className='absolute w-full h-full backface-hidden transform rotate-y-180'>
		// 			<img
		// 				className='w-full h-full rounded-xl border-2 border-white-100/20 transition-all duration-300 ease-in-out'
		// 				src={`/assets/level-one/Abstract-Circle-Sharp-Half--Streamline-Geometric-Shapes.svg`}
		// 				alt='back of card'
		// 				onClick={handleClick}
		// 			/>
		// 		</div>
		// 	</div>
		// </div>

		<div className='card'>
			<div className={flipped ? 'flipped' : ''}>
				<img
					className='front mx-auto'
					src={`/assets/${level}/${src}`}
					alt={src}
				/>
				<img
					className='back mx-auto'
					src={`/assets/card-backs/card-back-8.svg`}
					alt='back of card.'
					onClick={handleClick}
				/>
			</div>
		</div>
	)
}

export default Card
