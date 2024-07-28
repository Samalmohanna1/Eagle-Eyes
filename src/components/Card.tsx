import React, { useState, useEffect } from 'react'
import { CardType } from '../types'

interface CardProps {
	src: string
	level: string
	id: number
	handleChoice: (card: CardType) => void
	flipped: boolean
	disabled: boolean
	cardBack: string
	matched: boolean
}

const Card: React.FC<CardProps> = ({
	src,
	level,
	id,
	handleChoice,
	flipped,
	disabled,
	cardBack,
	matched,
}) => {
	const card = { src, level, id, matched, flipped, disabled }
	const [showLabel, setShowLabel] = useState(false)

	useEffect(() => {
		if (flipped && matched) {
			const timeout = setTimeout(() => {
				setShowLabel(true)
			}, 200)
			return () => clearTimeout(timeout)
		} else {
			setShowLabel(false)
		}
	}, [flipped, matched])

	const handleClick = () => {
		if (!disabled) {
			handleChoice(card)
		}
	}

	return (
		<div className='card w-full mx-auto hover:cursor-pointer'>
			<div className={flipped ? 'flipped' : ''}>
				<img
					className='front mx-auto'
					src={`/assets/${level}/${src}`}
					alt={src}
				/>
				<img
					className='back mx-auto bg-purple-100/55'
					src={`/assets/card-backs/${cardBack}`}
					alt='back of card.'
					onClick={handleClick}
				/>
				{level === 'level-three' && (
					<p
						className={`absolute opacity-0 bottom--1 bg-white-100 w-full text-step--1 text-black-300 font-bold text-center transform transition-all duration-500 ease-in-out ${
							showLabel
								? 'opacity-100 bottom-0'
								: 'opacity-0 bottom--1'
						}`}
					>
						{src.split('-')[0]}
					</p>
				)}
			</div>
		</div>
	)
}

export default Card
