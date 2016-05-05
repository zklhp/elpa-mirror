git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
echo -e $SSH_KEY > ~/.ssh/id_rsa

chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh

GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no" git clone git@git.coding.net:codefalling/melpa-mirror.git packages
npm install
node index.js
cd packages
git add .
git commit -m "update"

GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no" git push origin master:master --quiet

