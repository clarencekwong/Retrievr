class WebController < ActionController::Base
  def index
    @posters = Poster.all
    render :index
  end

  def show
    @pet = Pet.find(params[:id])
    render :show
  end
end
