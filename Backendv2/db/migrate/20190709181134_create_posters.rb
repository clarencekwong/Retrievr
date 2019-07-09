class CreatePosters < ActiveRecord::Migration[5.2]
  def change
    create_table :posters do |t|
      t.string :lat
      t.string :long
      t.uuid :pet_id
      t.string :pet_description
      t.string :poster_name
      t.string :poster_phone

      t.timestamps
    end
  end
end
