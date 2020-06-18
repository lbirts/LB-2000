class CreateSounds < ActiveRecord::Migration[6.0]
  def change
    create_table :sounds do |t|
      t.string :sound_name
      t.string :filename
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
