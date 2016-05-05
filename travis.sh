git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
echo -e $SSH_KEY > ~/.ssh/id_rsa

cp ssh_config ~/.ssh/ssh_config
# chmod 600 ~/.ssh/id_rsa
# chmod 600 ~/.ssh

git clone git@git.coding.net:codefalling/melpa-mirror.git packages
npm install
node index.js
cd packages
git add .
git commit -m "update"

git push origin master:master --quiet

