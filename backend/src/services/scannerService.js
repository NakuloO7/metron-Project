import axios from "axios";

const BASE_URL = "https://gitlab.com/api/v4";

const sensitiveFiles = [
  ".env",
  ".pem",
  "id_rsa",
  "config.json",
  "secrets.yml"
];

// Simple regex patterns

const secretPatterns = [
  /API[_-]?KEY/i,
  /SECRET/i,
  /TOKEN/i,
  /PASSWORD/i,
  /JWT_SECRET/i,
  /AWS_ACCESS_KEY/i
];

export const scanRepositories = async (repos) => {

    const results = [];

    for (const repo of repos) {

      try {


        const response = await axios.get(
          `${BASE_URL}/projects/${repo.id}/repository/tree`
        );  //get repo file structure

        const files = response.data;
        console.log("Logging out the response : ",response.data);
        const fileNames = files.map(file => file.name);
        console.log("All the file name listed : ",fileNames)

        const issues = [];

        // Sensitive files check
        const foundSensitiveFiles =
          sensitiveFiles.filter(file =>
            fileNames.includes(file)
          );

        if (foundSensitiveFiles.length > 0) {
          issues.push({
            issue: `Sensitive files found: ${foundSensitiveFiles.join(", ")}`,
            severity: "High"
          });
        }

        // Missing README
        if (!files.includes("README.md")) {
          issues.push({
            issue: "Missing README.md",
            severity: "Low"
          });
        }

        // Missing LICENSE
        if (!files.includes("LICENSE")) {
          issues.push({
            issue: "Missing LICENSE",
            severity: "Low"
          });
        }


        console.log("reached here1")
        //regex detection
        for(const file of files){
            try {
                // Skip folders
                if (file.type !== "blob")
                   continue;
                console.log("reached here")

                const contentResponse = await axios.get(`${BASE_URL}/projects/${repo.id}/repository/files/${encodeURIComponent(file.path)}/raw?ref=${repo.default_branch}`);
                const content = contentResponse.data;
                console.log( "content Found:", content);
                const foundSecret = secretPatterns.some(regex => regex.test(content));

                if (foundSecret) {
                    issues.push({
                        issue:`Potential secret found in ${file.name}`,
                        severity: "Medium"
                    });
                }
                console.log( "Secret Found:", foundSecret);
            } catch (error) {
                console.log(`Could not scan file ${file.name}`);
            }
        }

        results.push({
          repositoryName: repo.name,
          issues
        });

      } catch (error) {
        console.log(
          `Failed to scan repo ${repo.name}`
        );
      }
    }

    return results;
};