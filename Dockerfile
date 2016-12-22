FROM centos:centos7

MAINTAINER duttadeep55@outlook.com

# Enable EPEL for Node.js
RUN yum install -y epel-release

# Ruby development tools
#RUN yum install -y ruby ruby-devel gcc libxml2-devel

#RUN curl -sL https://rpm.nodesource.com/setup_4.x | bash -(Install Nodejs)
RUN yum install -y nodejs

# Minimal build essentials installation on CentOS
RUN yum groupinstall -y "Development Tools"   

# Install Protobuf
RUN yum install -y protobuf-c
RUN yum install -y protobuf-devel

# Copy app to /src
COPY . /src

# Install app and dependencies into /src
RUN cd /src; npm install
RUN cd /src; npm rebuild


EXPOSE 3000

CMD cd /src && node ./app.js
