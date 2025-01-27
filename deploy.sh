git co deploy
git merge main
npm run build
cp dist/index.html .
mkdir -p assests
git add index.html
git add assests
git commit -m "deploy commit"
git push origin deploy -f
rm -rf dist
git co main
