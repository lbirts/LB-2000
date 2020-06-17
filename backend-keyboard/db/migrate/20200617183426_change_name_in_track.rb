class ChangeNameInTrack < ActiveRecord::Migration[6.0]
  def change
    rename_column :tracks, :track, :filename
  end
end


