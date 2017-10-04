FROM ubuntu:16.10

# Install some dependencies
RUN apt-get update -y
RUN apt install -y dirmngr wget git curl apt-utils

# Install Java
RUN apt-get install -y default-jre

# Install node 6.x
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update
RUN apt-get install -y google-chrome-stable

# Install Xvfb
RUN apt-get install -y xvfb

CMD ['echo', 'Done!']