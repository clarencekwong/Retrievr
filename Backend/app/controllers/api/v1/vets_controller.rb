class Api::V1::VetsController < ApplicationController

  before_action :find_vet, only: [:update, :show]

  def index
    @vets = Vet.all
    render json: @vets
  end

  def show
    @vet = Vet.find(params[:id])
    render json: @vet, status: :OK
  end

  def create
    @vet = Vet.create(vet_params)
    render json: @vet, status: :created
  end

  def update
    @vet.update(vet_params)
  if @vet.save
    render json: @vet, status: :accepted
    else
      render json: { errors: @vet.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    @vet = Vet.find(params[:id])
    @vet.destroy
    render json: @vet, status: :deleted
  end

  private

  def vet_params
    params.permit(:name, :phone_number, :location)
  end

  def find_vet
    @vet = Vet.find(params[:id])
  end
end
