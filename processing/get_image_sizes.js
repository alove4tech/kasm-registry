const fs = require("fs");
const { glob } = require("glob");
const { execSync } = require('child_process');


(async () => {
	const files = await glob("../workspaces/**/workspace.json");

	let total = 0
	for (const file of files) {

		let filedata = fs.readFileSync(file);
		let parsed = JSON.parse(filedata);


		parsed.compatibility.forEach((element, index) => {
			total++
			if (element.uncompressed_size_mb === 0) {
				execSync('docker image prune -a -f')
				execSync('docker system prune --all --force --volumes')

				let pull = execSync('docker pull ' + element.image)
				let inspect = execSync('docker inspect -f "{{ .Size }}"  ' + element.image)
				let size = Math.round(inspect / 1000000)
				let remove = execSync('docker rmi ' + element.image)
				console.log(remove)
				parsed.compatibility[index].uncompressed_size_mb = size
				console.log('Write file: ' + parsed.friendly_name + ' - ' + element.version + ': ' + size)
				fs.writeFileSync(file, JSON.stringify(parsed, null, 2));
			} else {
				console.log(parsed.friendly_name + ' - ' + element.version + ': skipped')
			}

		})

	}
	console.log(total + ' entries processed')
})();
