class Api::V1::PetsController < ApplicationController
  before_action :find_pet, only: [:update, :show]
  def index
    @pets = Pet.all
    render json: @pets
  end

  def show
    render json: @pet
  end

  def create
    @pet = Pet.create(pet_params)
    render json: @pet, status: :created
  end

  def update
    @pet.update(pet_params)
    render json: @pet, status: :OK
  end

  def destroy
    @pet = Pet.find(params[:id])
    @pet.destroy
    render json: @pet, status: :deleted
  end

  private

  def find_pet
    @pet = Pet.find(params[:id])
  end

  def pet_params
    params.permit(:id, :name, :age, :breed, :missing, :image, :last_vet_visit, :missing_latitude, :missing_longitude, :found_latitude, :found_longitude, :finder_name, :finder_phone_number, :user_id, :vet_id, :instagram)
  end
end
