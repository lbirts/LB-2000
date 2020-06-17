class TracksController < ApplicationController
  before_action :set_track, only: [:show, :update, :destroy]

  # GET /tracks
  def index
    @tracks = Track.all

    render json: @tracks.to_json(:include => 
    {:user => {:except => [:created_at, :updated_at]}}, 
    :except => [:created_at, :updated_at])
  end

  # GET /tracks/1
  def show
    render json: @track.to_json(:include => 
    {:user => {:except => [:created_at, :updated_at]}}, 
    :except => [:created_at, :updated_at])
  end

  # POST /tracks
  def create
    # byebug
    @track = Track.new(track_params)

    if @track.save
      render json: @track, status: :created, location: @track
    else
      render json: @track.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tracks/1
  def update
    if @track.update(track_params)
      render json: @track
    else
      render json: @track.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tracks/1
  def destroy
    @track.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_track
      @track = Track.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def track_params
      params.require(:track).permit(:filename, :user_id, :track_name)
    end
end
