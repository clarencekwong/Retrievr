class CreatePosters < ActiveRecord::Migration[5.2]
  def change
    create_table :posters do |t|
      t.string :missing_lat
      t.string :missing_lon
      t.string :descriptors
      t.datetime :missing_time
      t.string :comments
      t.integer :pet_id

      t.timestamps
    end
  end
end
