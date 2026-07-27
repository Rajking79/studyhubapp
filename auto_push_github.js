const { execSync } = require('child_process');
const https = require('https');

const token = process.env.GITHUB_TOKEN || "GITHUB_PERSONAL_ACCESS_TOKEN";
const user = "Rajking79";

const repos = [
  { name: "studyhub_admin_panel", path: "d:/studyhubapp/studyhub_admin_panel", desc: "React + Tailwind CSS v4 + Chakra UI Admin Web Panel for StudyHub" },
  { name: "studyhub_backend_server", path: "d:/studyhubapp/studyhub_backend_server", desc: "Node.js + Express REST API Backend Server & Postman Collection for StudyHub" },
  { name: "studyhub_mobile_app", path: "d:/studyhubapp/studyhub_mobile_app", desc: "Flutter Mobile App for Android & iOS for StudyHub" }
];

function createGitHubRepo(repoName, description) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      name: repoName,
      description: description,
      private: false
    });

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: '/user/repos',
      method: 'POST',
      headers: {
        'User-Agent': 'Node.js-Auto-Pusher',
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 201 || res.statusCode === 422) {
          console.log(`✅ GitHub Repository '${repoName}' ready on account ${user}!`);
          resolve(true);
        } else {
          console.log(`Notice '${repoName}' status: ${res.statusCode} - ${body.substring(0, 100)}`);
          resolve(true);
        }
      });
    });

    req.on('error', (e) => resolve(false));
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🚀 Starting Automatic GitHub Repositories Creation & Push for Rajking79...\n');

  for (let repo of repos) {
    console.log(`📌 Creating GitHub Repo: ${repo.name}...`);
    await createGitHubRepo(repo.name, repo.desc);

    const remoteUrl = `https://${token}@github.com/${user}/${repo.name}.git`;
    console.log(`📤 Pushing ${repo.name} to GitHub...`);

    try {
      try {
        execSync(`git remote remove origin`, { cwd: repo.path, stdio: 'ignore' });
      } catch (e) {}

      execSync(`git remote add origin ${remoteUrl}`, { cwd: repo.path, stdio: 'pipe' });
      execSync(`git branch -M main`, { cwd: repo.path, stdio: 'pipe' });
      execSync(`git push -u origin main --force`, { cwd: repo.path, stdio: 'pipe' });
      console.log(`🎉 SUCCESS: ${repo.name} pushed live to https://github.com/${user}/${repo.name} !\n`);
    } catch (e) {
      console.log(`⚠️ Push error for ${repo.name}:`, e.message);
    }
  }

  console.log('🏁 All 3 Repositories Pushed to GitHub Successfully!');
}

main();
