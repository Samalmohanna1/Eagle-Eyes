import React from 'react'

const Credits: React.FC<{}> = () => {
	return (
		<div className='max-w-screen-sm rounded-md p-space-s space-y-2 text-left'>
			<p className='font-bold leading-snug'>Credits</p>
			<p className='text-step--1'>
				Designer & Developer -{' '}
				<a
					className='hover:text-green-100'
					href='https://sam-almohanna.com/'
					target='_blank'
					rel='noopener noreferrer'
				>
					Sam Almohanna
				</a>
			</p>
			<p className='text-step--1'>
				Geometric and Organic shapes by{' '}
				<a
					className='hover:text-green-100'
					href='https://streamlinehq.com/'
					target='_blank'
					rel='noopener noreferrer'
				>
					https://streamlinehq.com/
				</a>
			</p>
		</div>
	)
}

export default Credits
