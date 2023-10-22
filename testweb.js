const fs = require('fs');

function extractData(json, result = {}) {
  for (const key in json) {
    if (typeof json[key] === 'object') {
      if (json[key].value) {
        result[key] = json[key].value;
      } else {
        if (key === 'content') {
          for (const subKey in json[key]) {
            result[subKey] = json[key][subKey].value;
          }
        } else {
          if (key === 'color') {
            result['colors'] = extractData(json[key]); // Rename 'color' to 'colors'
          } else {
            result[key] = extractData(json[key]);
          }
        }
      }
    }
  }
  return result;
}

// GitHub API URL for the raw content of a file in your repository
const githubApiUrl =
  'https://raw.githubusercontent.com/SelimAbdelmonsefBtech/tailwindconfig/main/outputs_fiber.json';

const accessToken = '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'; // access token

// Fetch the JSON data from GitHub
fetch(githubApiUrl, {
  headers: {
    Authorization: `token ${accessToken}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then((data) => {
    const jsonData = JSON.parse(data);

    const tailwindConfig = {
      content: ['./src/**/*.{js,jsx,ts,tsx}'],
      darkMode: 'class',
      theme: {},
      variants: {},
      plugins: [],
    };

    const extractedData = extractData(jsonData);

    tailwindConfig.theme.extend = extractedData;

    // Writing the tailwind.config.js file
    const configContent = `/** @type {import('tailwindcss').Config} */
    module.exports = ${JSON.stringify(tailwindConfig, null, 2)}`;

    fs.writeFile('tailwind.config.js', configContent, (err) => {
      if (err) {
        console.error('Error writing Tailwind config:', err);
        return;
      }
      console.log('Tailwind config generated successfully!');
    });
  })
  .catch((error) => {
    console.error('Error fetching file from GitHub:', error);
  });
