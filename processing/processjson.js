const fs = require("fs");
const path = require("path");
const { glob } = require("glob");
const { hashElement } = require("folder-hash");
const nextConfig = require("../site/next.config.js")

const repoRoot = path.resolve(__dirname, '..');
process.chdir(repoRoot);

var dir = "./public";

if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}
if (!fs.existsSync(dir + "/icons")) {
	fs.mkdirSync(dir + "/icons");
}

(async () => {
	const files = (await glob("workspaces/**/workspace.json")).sort();

	let workspaces = [];
	let errors = [];

	const options = {
		algo: "sha1",
		encoding: "hex",
	};

	let channels = new Set()
	let versions = new Set()

	for (const file of files) {

		let folder = file.replace("/workspace.json", "");

		let hash = await hashElement(folder, options);
		let filedata = fs.readFileSync(file);

		let parsed;
		try {
			parsed = JSON.parse(filedata);
		} catch (error) {
			errors.push(`Failed to parse ${file}: ${error.message}`);
			continue;
		}
		parsed.sha = hash.hash;
		if (!parsed.name && Array.isArray(parsed.compatibility) && parsed.compatibility.length > 0 && parsed.compatibility[0].image) {
			// Fallback: derive name from first compatibility image (without tag)
			parsed.name = parsed.compatibility[0].image.split(':')[0];
		}
		console.log(parsed.friendly_name + ' added')
		parsed.compatibility.forEach((element, index) => {
			if ('available_tags' in element) {
				element.available_tags.forEach((el) => {
					channels.add(el)
				})
			}
			if ('version' in element) {
				versions.add(element.version)
			}
		})
		workspaces.push(parsed);

		if (fs.existsSync(folder + "/" + parsed.image_src)) {
			let imagedata = fs.readFileSync(folder + "/" + parsed.image_src);
			fs.writeFileSync(dir + "/icons/" + parsed.image_src, imagedata);
		} else {
			errors.push("missing file: " + folder + "/" + parsed.image_src);
		}

	}

	let json = {
		name: nextConfig.env.name || 'Unknown store',
		workspacecount: workspaces.length,
		icon: nextConfig.env.icon || null,
		description: nextConfig.env.description || null,
		list_url: nextConfig.env.listUrl || null,
		contact_url: nextConfig.env.contactUrl || null,
		modified: Date.now(),
		workspaces: workspaces,
		channels: [...channels],
		default_channel: 'develop'
	};

	if (channels.size === 0) {
		json.default_channel = null
	}

	if (errors.length > 0) {
		console.error('Failed to process workspace registry:\n');
		for (const error of errors) {
			console.error(`- ${error}`);
		}
		process.exit(1);
	}

	let data = JSON.stringify(json, null, 2) + "\n";

	fs.writeFileSync(dir + "/list.json", data);
	fs.writeFileSync(dir + "/versions.json", JSON.stringify({
		versions: [...versions]
	}, null, 2) + "\n");
})();
