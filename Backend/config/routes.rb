Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :pets
      resources :vets
      resources :posters
    end
  end
  get '/missing-posters', to: 'web#index'
end
