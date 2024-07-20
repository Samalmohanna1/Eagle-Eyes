import levelOne from './utils/level-one.json'
import Card from './components/card'

function App() {
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
			<div className='grid grid-cols-5 gap-4 py-space-2xl'>
				{levelOne && levelOne.length > 0 ? (
					levelOne.map((card, index) => (
						<Card key={index} src={card.src} level={card.level} />
					))
				) : (
					<p>No images available</p>
				)}
			</div>
		</main>
	)
}

export default App
