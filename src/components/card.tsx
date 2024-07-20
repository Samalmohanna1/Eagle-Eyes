import React from 'react'

interface CardProps {
	src: string
	level: string
}

const Card: React.FC<CardProps> = ({ src, level }) => {
	return (
		<div>
			<div className='p-space-2xs mx-auto rounded-xl border-2 border-white-100/20 hover:border-white-100/80 transition-all duration-300 ease-in-out'>
				<img src={`/assets/${level}/${src}`} alt={src} />
			</div>
			<div className='p-space-2xs mx-auto rounded-xl border-2 border-white-100/20 hover:border-white-100/80 transition-all duration-300 ease-in-out overflow-hidden'>
				<img
					className='scale-200 relative bottom-10'
					src={`/assets/level-one/Abstract-Circle-Sharp-Half--Streamline-Geometric-Shapes.svg`}
					alt='back of card.'
				/>
			</div>
		</div>
	)
}

export default Card
