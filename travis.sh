git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
echo -e $SSH_KEY > ~/.ssh/id_rsa

echo "Host github.com" >> ~/.ssh/config
echo "   Hostname github.com" >> ~/.ssh/config
echo "   StrictHostKeyChecking no" >> ~/.ssh/config
echo "   CheckHostIP no" >> ~/.ssh/config
echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config

chmod 600 ~/.ssh/id_rsa
# chmod 600 ~/.ssh

# cat ~/.ssh/config
git clone git@github.com:CodeFalling/elpa-mirror.git packages -b gh-pages --depth=1

# remove old files
rm -r -f packages/gnu
rm -r -f packages/melpa
rm -r -f packages/org

npm install
node index.js
cd packages
git add .
git commit -m "update"

git push origin gh-pages:gh-pages

