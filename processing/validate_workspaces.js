const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const workspacesRoot = path.join(repoRoot, 'workspaces');

const entries = fs.readdirSync(workspacesRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());

const issues = [];

for (const entry of entries) {
  const workspaceDir = path.join(workspacesRoot, entry.name);
  const jsonPath = path.join(workspaceDir, 'workspace.json');
  const readmePath = path.join(workspaceDir, 'README.md');
  const readmeText = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf8') : '';

  if (!fs.existsSync(jsonPath)) {
    issues.push(`${entry.name}: missing workspace.json`);
    continue;
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch (error) {
    issues.push(`${entry.name}: workspace.json is not valid JSON (${error.message})`);
    continue;
  }

  if (!config.friendly_name || typeof config.friendly_name !== 'string') {
    issues.push(`${entry.name}: friendly_name is missing or invalid`);
  }

  if (!config.description || typeof config.description !== 'string') {
    issues.push(`${entry.name}: description is missing or invalid`);
  }

  if (!config.image_src || typeof config.image_src !== 'string') {
    issues.push(`${entry.name}: image_src is missing or invalid`);
  } else if (!fs.existsSync(path.join(workspaceDir, config.image_src))) {
    issues.push(`${entry.name}: image_src points to missing file (${config.image_src})`);
  }

  if (!fs.existsSync(readmePath)) {
    issues.push(`${entry.name}: missing README.md`);
  }

  const allowTagException =
    config.enabled === false &&
    /disabled until/i.test(readmeText) &&
    /custom image/i.test(readmeText);

  if (!Array.isArray(config.compatibility) || config.compatibility.length === 0) {
    issues.push(`${entry.name}: compatibility block is missing or empty`);
    continue;
  }

  for (const compatibility of config.compatibility) {
    if (!compatibility.version || !compatibility.image) {
      issues.push(`${entry.name}: compatibility entries need version and image`);
      continue;
    }

    const availableTags = compatibility.available_tags;
    if (!Array.isArray(availableTags) || availableTags.length === 0) {
      issues.push(`${entry.name}: ${compatibility.version} has no available_tags`);
      continue;
    }

    const baseVersion = compatibility.version.replace(/\.x$/, '.0');
    const expectedVersionTag = baseVersion;
    if (!allowTagException) {
      if (!availableTags.includes('develop')) {
        issues.push(`${entry.name}: ${compatibility.version} is missing develop tag`);
      }
      if (!availableTags.includes(expectedVersionTag)) {
        issues.push(`${entry.name}: ${compatibility.version} is missing ${expectedVersionTag}`);
      }
      if (!availableTags.includes(`${baseVersion}-rolling-weekly`)) {
        issues.push(`${entry.name}: ${compatibility.version} is missing ${baseVersion}-rolling-weekly`);
      }
      if (!availableTags.includes(`${baseVersion}-rolling-daily`)) {
        issues.push(`${entry.name}: ${compatibility.version} is missing ${baseVersion}-rolling-daily`);
      }
    }

    if (compatibility.uncompressed_size_mb === undefined || Number(compatibility.uncompressed_size_mb) <= 0) {
      issues.push(`${entry.name}: ${compatibility.version} needs a positive uncompressed_size_mb`);
    }
  }
}

if (issues.length > 0) {
  console.error('Workspace validation failed:\n');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Validated ${entries.length} workspace definitions successfully.`);
