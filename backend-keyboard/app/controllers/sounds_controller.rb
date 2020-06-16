class SoundsController < ApplicationController
  before_action :set_sound, only: [:show, :update, :destroy]

  # # GET /sounds
  # def index
  #   @sounds = Sound.all

  #   render json: @sounds
  # end

  # GET /sounds/1
  def show
    render json: @sound, include: :category
  end

  # # POST /sounds
  # def create
  #   @sound = Sound.new(sound_params)

  #   if @sound.save
  #     render json: @sound, status: :created, location: @sound
  #   else
  #     render json: @sound.errors, status: :unprocessable_entity
  #   end
  # end

  # # PATCH/PUT /sounds/1
  # def update
  #   if @sound.update(sound_params)
  #     render json: @sound
  #   else
  #     render json: @sound.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /sounds/1
  # def destroy
  #   @sound.destroy
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sound
      @sound = Sound.find(params[:id])
    end

  #   # Only allow a trusted parameter "white list" through.
  #   def sound_params
  #     params.require(:sound).permit(:sound_name, :sound, :category_id)
  #   end
end
