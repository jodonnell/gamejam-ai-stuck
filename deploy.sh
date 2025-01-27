git branch -D deploy
git co -b deploy
npm run build
cp dist/index.html .
mkdir -p assets
cp dist/assets/* assets/.
git add index.html
git add assets
git commit -m "deploy commit"
git push origin deploy -f
rm -rf dist
git co main
