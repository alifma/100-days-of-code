# Deployment Frontend on CPanel
this is the second part of deployment from the `Day012`
1. Build your project using `yarn build` or others
2. Make sure the backend is pointing to the backend URL
3. copy the `dist` folder to the backend project
4. add routes frontend `dist` folder as static file in your backend route
```js
// After your import
app.use(express.static(path.join(__dirname, './dist')));
// your remaining code
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
```
5. re-deploy your backend
6. Enjoy it