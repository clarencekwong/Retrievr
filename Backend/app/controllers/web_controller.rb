class WebController < ActionController::Base
  def index
    @posters = Poster.all
    render :index 
  end
end
