#!/bin/bash

# Give permission
sudo chmod -R 777 /home/ec2-user/nodejs-app

# Navigate into our working directory
cd /home/ec2-user/nodejs-app

# add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install node modules
npm install

# Start server in the background
node server.js > server.out.log 2> server.err.log < /dev/null &  # you can add your own scripts