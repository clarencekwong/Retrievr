Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :pets #, only: [:index, :update, :show]
      resources :vets
    end
  end
  # namespace :api do
  #   namespace :v1 do
  #       resources :pets
  #   end
  # end
end
