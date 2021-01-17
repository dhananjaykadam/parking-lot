FROM ruby:2.7

RUN apt-get update 
RUN apt-get install -y nodejs npm
RUN gem install bundler
WORKDIR /app
COPY . /app
RUN cd functional_spec && bundle update --bundler

CMD ["bin/run_functional_tests"]