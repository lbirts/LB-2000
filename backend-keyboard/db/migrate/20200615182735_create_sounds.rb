class CreateSounds < ActiveRecord::Migration[6.0]
  def change
    create_table :sounds do |t|
      t.text :sound_name
      t.text :filename
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
