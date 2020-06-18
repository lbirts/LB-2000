class CreateTracks < ActiveRecord::Migration[6.0]
  def change
    create_table :tracks do |t|
      t.string :filename
      t.string :track_name
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
