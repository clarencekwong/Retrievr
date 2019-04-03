class Api::V1::PetsController < ApplicationController
  before_action :find_pet, only: [:update]
  def index
  @pets = Pet.all
  render json: @pets
  end

  def show
  @pet = Pet.find(params[:id])
  render json: @pet, status: :OK
  end

  def create
  @pet = Pet.create(pet_params)
  render json: @pet, status: :created
  end

  def update
  @pet.update(pet_params)
  if @pet.save
    render json: @pet, status: :accepted
  else
    render json: { errors: @pet.errors.full_messages }, status: :unprocessible_entity
  end
  end

  def destroy
  @pet = Pet.find(params[:id])
  @pet.destroy
  render json: @pet, status: :deleted
  end

  private

  def pet_params
  params.permit(:title, :content)
  end

  def find_pet
  @pet = Pet.find(params[:id])
  end
end
