git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
mkdir ~/.ssh
cat codingKey >> ~/.ssh/known_hosts
echo -e $SSH_KEY > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh
export GIT_TERMINAL_PROMPT=0
git clone git@git.coding.net:codefalling/melpa-mirror.git packages
npm install
node index.js
cd packages
git add .
git commit -m "update"
git push origin master:master --quiet

