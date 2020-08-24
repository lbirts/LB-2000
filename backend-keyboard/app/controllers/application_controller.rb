class ApplicationController < ActionController::API

    def index
        render html: "<h1>Hello World</h1>".html_safe
    end
end
