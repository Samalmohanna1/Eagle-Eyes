import fs from 'fs'
import path from 'path'

const assetsDir = path.join(process.cwd(), '../../public/assets')
const outputDir = process.cwd()

async function generateJsonForDirectory(directory, relativeDir) {
	try {
		const files = await fs.promises.readdir(directory)

		const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg']
		const imagePaths = files
			.filter((file) =>
				imageExtensions.includes(path.extname(file).toLowerCase())
			)
			.map((file) => ({ src: path.posix.join(relativeDir, file) }))

		const outputJson = path.join(
			outputDir,
			path.basename(directory) + '.json'
		)

		await fs.promises.writeFile(
			outputJson,
			JSON.stringify(imagePaths, null, 2),
			'utf8'
		)
		console.log(`JSON file has been saved for ${path.basename(directory)}.`)
	} catch (err) {
		console.error(`Error processing ${directory}:`, err)
	}
}

async function processAllSubdirectories() {
	try {
		const subdirectories = await fs.promises.readdir(assetsDir, {
			withFileTypes: true,
		})

		for (const dirent of subdirectories) {
			if (dirent.isDirectory()) {
				const subdirectoryPath = path.join(assetsDir, dirent.name)
				const relativeDir = path.posix.join('/assets', dirent.name)
				await generateJsonForDirectory(subdirectoryPath, relativeDir)
			}
		}
	} catch (err) {
		console.error('Error reading assets directory:', err)
	}
}

processAllSubdirectories()
