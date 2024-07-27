import React, { useState } from 'react'
import cardBacks from '../utils/card-backs.json'
import Credits from './Credits'

interface SettingsProps {
	onClose: () => void
	onCardBackChange: (cardBackSrc: string) => void
}

const Settings: React.FC<SettingsProps> = ({ onClose, onCardBackChange }) => {
	const [selectedCardBack, setSelectedCardBack] = useState<string | null>(
		null
	)

	const handleCardBackChange = (src: string) => {
		setSelectedCardBack(src)
		onCardBackChange(src) // Notify parent about the change
	}

	const handleClick = () => {
		onClose()
	}

	return (
		<div className='fixed inset-0 bg-black-300/50 backdrop-blur-sm flex flex-col justify-center items-center'>
			<div className='max-w-screen-sm md:p-space-2xl p-space-m rounded-lg bg-black-200 border-2 border-white-100/75'>
				<div className='flex flex-col gap-8 justify-center mx-auto text-center h-full'>
					<p className='text-step-3 font-black leading-none'>
						Settings
						<span className=''>&#128295;</span>
					</p>
					<div className='rounded-md px-space-s py-space-l space-y-4 bg-black-300/50 text-left'>
						<p className='text-step--1 font-bold'>
							Card Back Design:
						</p>
						<div className='flex flex-wrap gap-4'>
							{cardBacks.map((cardBack) => (
								<div
									key={cardBack.src}
									className={`rounded-lg cursor-pointer ${
										selectedCardBack === cardBack.src
											? 'border-white-100'
											: 'border-transparent'
									}`}
									onClick={() =>
										handleCardBackChange(cardBack.src)
									}
								>
									<img
										src={`/assets/card-backs/${cardBack.src}`}
										alt='Card Back Design'
										className='w-16 object-cover rounded-lg'
									/>
								</div>
							))}
						</div>
					</div>

					<button
						className='font-black px-space-s py-space-2xs rounded-lg border-2 border-white-100/75 hover:border-white-100 transition-all duration-300 ease-in-out'
						onClick={handleClick}
					>
						Back to Game
					</button>
					<Credits />
				</div>
			</div>
		</div>
	)
}

export default Settings
