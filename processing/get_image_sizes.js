const fs = require("fs");
const path = require("path");
const { glob } = require("glob");
const { execSync } = require('child_process');

// WARNING: This script runs `docker image prune -a -f` and `docker system prune --all --force --volumes`
// before each image pull. This will REMOVE all unused Docker images, containers, and volumes on the host.
// Only run this in a dedicated or disposable environment.

const repoRoot = path.resolve(__dirname, '..');

(async () => {
	const pattern = path.join(repoRoot, 'workspaces', '**', 'workspace.json').replace(/\\/g, '/');
	const files = await glob(pattern);

	let total = 0
	let failed = 0
	let skipped = 0
	let updated = 0
	for (const file of files) {

		let filedata = fs.readFileSync(file);
		let parsed;

		try {
			parsed = JSON.parse(filedata);
		} catch (err) {
			console.error(`Skipping ${file}: invalid JSON (${err.message})`);
			failed++;
			continue;
		}

		parsed.compatibility.forEach((element, index) => {
			total++
			if (element.uncompressed_size_mb === 0) {
				try {
					execSync('docker image prune -a -f', { stdio: 'pipe' })
					execSync('docker system prune --all --force --volumes', { stdio: 'pipe' })

					execSync('docker pull ' + element.image)
					let inspect = execSync('docker inspect -f "{{ .Size }}"  ' + element.image)
					let size = Math.round(inspect / 1000000)

					try {
						execSync('docker rmi ' + element.image, { stdio: 'pipe' })
					} catch (rmErr) {
						console.warn(`  Warning: failed to remove image ${element.image}: ${rmErr.message}`)
					}

					parsed.compatibility[index].uncompressed_size_mb = size
					console.log('Updated: ' + parsed.friendly_name + ' - ' + element.version + ': ' + size + ' MB')
					fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + "\n");
					updated++
				} catch (err) {
					console.error(`  ERROR: failed to process ${parsed.friendly_name} ${element.version} (${element.image}): ${err.message}`)
					failed++
				}
			} else {
				console.log(parsed.friendly_name + ' - ' + element.version + ': skipped (already ' + element.uncompressed_size_mb + ' MB)')
				skipped++
			}

		})

	}
	console.log(`${total} entries processed: ${updated} updated, ${skipped} skipped, ${failed} failed`)
	if (failed > 0) {
		process.exit(1)
	}
})();
