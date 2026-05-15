const fs = require("fs");
const path = require("path");
const { glob } = require("glob");
const { hashElement } = require("folder-hash");
const nextConfig = require("../site/next.config.js")

const repoRoot = path.resolve(__dirname, '..');
process.chdir(repoRoot);

const publicDir = path.join(repoRoot, 'public');
const iconsDir = path.join(publicDir, 'icons');

if (!fs.existsSync(publicDir)) {
	fs.mkdirSync(publicDir);
}
if (!fs.existsSync(iconsDir)) {
	fs.mkdirSync(iconsDir);
}

(async () => {
	const files = (await glob("workspaces/**/workspace.json")).sort();

	const workspaces = [];
	const errors = [];
	const seenNames = new Set();

	const options = {
		algo: "sha1",
		encoding: "hex",
	};

	const channels = new Set()
	const versions = new Set()

	for (const file of files) {

		const folder = file.replace("/workspace.json", "");

		const hash = await hashElement(folder, options);
		const filedata = fs.readFileSync(file);

		let parsed;
		try {
			parsed = JSON.parse(filedata);
		} catch (error) {
			errors.push(`Failed to parse ${file}: ${error.message}`);
			continue;
		}
		parsed.sha = hash.hash;

		// Fallback: derive name from first compatibility image (without tag)
		if (!parsed.name && Array.isArray(parsed.compatibility) && parsed.compatibility.length > 0 && parsed.compatibility[0].image) {
			const imageRef = parsed.compatibility[0].image.split(':')[0];
			// Strip any registry prefix to get just the image name
			const parts = imageRef.split('/');
			parsed.name = parts.length > 1 ? parts.slice(-2).join('/') : imageRef;
		}

		if (!parsed.friendly_name) {
			errors.push(`${file}: missing friendly_name, skipping`);
			continue;
		}

		if (seenNames.has(parsed.friendly_name)) {
			errors.push(`${file}: duplicate friendly_name "${parsed.friendly_name}"`);
			continue;
		}
		seenNames.add(parsed.friendly_name);

		if (!parsed.image_src) {
			errors.push(`${file}: missing image_src`);
			continue;
		}

		console.log(parsed.friendly_name + ' added')
		parsed.compatibility.forEach((element) => {
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

		const iconSource = path.join(folder, parsed.image_src);
		const iconDest = path.join(iconsDir, parsed.image_src);
		if (fs.existsSync(iconSource)) {
			const imagedata = fs.readFileSync(iconSource);
			fs.writeFileSync(iconDest, imagedata);
		} else {
			errors.push("missing file: " + iconSource);
		}

	}

	const json = {
		name: nextConfig.env.name || 'Unknown store',
		workspacecount: workspaces.length,
		icon: nextConfig.env.icon || null,
		description: nextConfig.env.description || null,
		list_url: nextConfig.env.listUrl || null,
		contact_url: nextConfig.env.contactUrl || null,
		modified: Date.now(),
		workspaces: workspaces,
		channels: [...channels],
		default_channel: channels.has('develop') ? 'develop' : (channels.size > 0 ? [...channels][0] : null)
	};

	if (errors.length > 0) {
		console.error('Failed to process workspace registry:\n');
		for (const error of errors) {
			console.error(`- ${error}`);
		}
		process.exit(1);
	}

	const data = JSON.stringify(json, null, 2) + "\n";

	fs.writeFileSync(path.join(publicDir, "list.json"), data);
	fs.writeFileSync(path.join(publicDir, "versions.json"), JSON.stringify({
		versions: [...versions]
	}, null, 2) + "\n");
})();
