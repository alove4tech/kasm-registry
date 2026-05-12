const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

// Accept version as CLI arg or env var, e.g.: node add_next_version.js 1.19
// or: BASE_VERSION=1.19 node add_next_version.js
const baseversion = process.argv[2] || process.env.BASE_VERSION || null;

if (!baseversion) {
  console.error("Usage: node add_next_version.js <base_version>");
  console.error("   or: BASE_VERSION=<base_version> node add_next_version.js");
  console.error("");
  console.error("Example: node add_next_version.js 1.19");
  process.exit(1);
}

const tag = ':develop'

const version = baseversion + '.x'
const tagversion = baseversion + '.0'

const repoRoot = path.resolve(__dirname, '..');

(async () => {
	const pattern = path.join(repoRoot, 'workspaces', '**', 'workspace.json').replace(/\\/g, '/');
	const files = await glob(pattern);

	let added = 0;
	let skipped = 0;
	let disabled = 0;

	for (const file of files) {

		let filedata = fs.readFileSync(file);
		let parsed = JSON.parse(filedata);

		if (parsed.enabled === false) {
			console.log(`Skipping ${parsed.friendly_name}: workspace is disabled`);
			disabled++;
			continue;
		}

		const current = parsed.compatibility[parsed.compatibility.length - 1]
		const image = current.image.split(':')[0]

		const exists = parsed.compatibility.findIndex(el => el.version === version)

		let details = {
			version,
			image: image + tag,
			uncompressed_size_mb: 0,
			available_tags: [
				'develop',
				tagversion,
				tagversion + '-rolling-weekly',
				tagversion + '-rolling-daily'
			]
		}

		if (exists === -1) {
			parsed.compatibility.push(details)
			fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + "\n");
			console.log(`Added ${version} to ${parsed.friendly_name}`);
			added++;
		} else {
			console.log(`Skipped ${parsed.friendly_name}: ${version} already exists`);
			skipped++;
		}
	}

	console.log(`\nDone: ${added} added, ${skipped} already present, ${disabled} disabled`);
})();
