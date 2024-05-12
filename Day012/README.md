# Deployment Backend on CPanel
if you already have CPanel with "Deploy Node JS" feature and wanted to deploy backend services on it, you can deploy it with this step
1. Zip the files
2. Go to CPanel, create a domain
3. Go To File Manger, unzip the Zip file
4. Go to "Deploy a Node JS"
5. Create Applicatino with this coniguration
  - `Node.js version` use recomennded
  - `Application root` put this one `/home/USER/public_html/{FOLDER}` 
  - `Application URL` select the domain you already created on point 2
  - `Application startup file` put the path of your main file, usually on package.json start command, just put the file path `src/server.js`
6. Add environment variables based on your needs 
7. Press `Create` button
8. After waiting a couple of second will bea appeared `Detected configuration files` section
9. Press `Run NPM Install` button
10. Press `Run JS Script` button and select the script to run the project
11. You can use it by using the URL, you don't have to add Port to the URL