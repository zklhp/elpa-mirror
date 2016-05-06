git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
echo -e $SSH_KEY > ~/.ssh/id_rsa

echo "Host git.coding.net" >> ~/.ssh/config
echo "   Hostname git.coding.net" >> ~/.ssh/config
echo "   StrictHostKeyChecking no" >> ~/.ssh/config
echo "   CheckHostIP no" >> ~/.ssh/config
echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config

chmod 600 ~/.ssh/id_rsa
# chmod 600 ~/.ssh

# cat ~/.ssh/config
git clone git@git.coding.net:codefalling/elpa.git packages -b coding-pages --depth=1

# remove old files
rm -r -f packages/gnu
rm -r -f packages/melpa
rm -r -f packages/org

npm install
node index.js
cd packages
git add .
git commit -m "update"

git push origin coding-pages:coding-pages

