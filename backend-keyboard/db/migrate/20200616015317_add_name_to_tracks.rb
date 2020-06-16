class AddNameToTracks < ActiveRecord::Migration[6.0]
  def change
    add_column :tracks, :track_name, :string
  end
end
