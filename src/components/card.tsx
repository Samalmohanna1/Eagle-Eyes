import React from 'react'

interface CardProps {
	src: string
	level: string
}

const Card: React.FC<CardProps> = ({ src, level }) => {
	return (
		<div className='card'>
			<img
				className='p-space-2xs rounded-xl border-2 border-white-100/20 hover:border-white-100/80 transition-all duration-300 ease-in-out'
				src={`/assets/${level}/${src}`}
				alt={src}
			/>
		</div>
	)
}

export default Card
