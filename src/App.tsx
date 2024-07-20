import levelOne from './utils/level-one.json'

function App() {
	return (
		<main className=''>
			<div className='container'>
				<h1 className='text-step-5'>Eagle Eyes</h1>
				<p className='read-the-docs'>
					A memory game for the detail obsessed.
				</p>
			</div>
			<div className='container grid grid-cols-5 gap-4 py-space-2xl'>
				{levelOne && levelOne.length > 0 ? (
					levelOne.map((card, index) => (
						<img
							key={index}
							className='col-span-1 rounded-badge'
							src={card.src}
							alt={`Image ${index + 1}`}
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
