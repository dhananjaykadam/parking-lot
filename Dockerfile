FROM ruby:2.7

RUN gem install bundler
RUN apt-get update && apt-get install -y nodejs yarn
WORKDIR /app
COPY . /app
RUN cd functional_spec && bundle update --bundler

CMD ["bin/run_functional_tests"]