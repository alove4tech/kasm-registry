const fs = require("fs");
const { glob } = require("glob");

(async () => {
	const files = await glob("../workspaces/**/workspace.json");

	for (const file of files) {

		let filedata = fs.readFileSync(file);
		let parsed = JSON.parse(filedata);
		delete parsed.compatibility

		parsed.compatibility = []

		let details = {
			version: '1.16.x',
			image: parsed.name.split(':')[0] + ':1.16.0-rolling-daily',
			uncompressed_size_mb: parsed.uncompressed_size_mb,
			available_tags: [
				'develop',
				'1.16.0',
				'1.16.0-rolling-weekly',
				'1.16.0-rolling-daily'
			]
		}

		parsed.compatibility.push(details)
		delete parsed.uncompressed_size_mb
		delete parsed.name

		fs.writeFileSync(file, JSON.stringify(parsed, null, 2));
	}
})();
