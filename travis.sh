git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
mkdir ~/.ssh
echo -e $SSH_KEY > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh

ssh-keyscan git.coding.net >> key
ssh-keygen -lf key >> ~/.ssh/known_hosts

git clone git@git.coding.net:codefalling/melpa-mirror.git packages
npm install
node index.js
cd packages
git add .
git commit -m "update"
git push origin master:master --quiet

