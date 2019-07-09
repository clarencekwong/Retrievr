class CreatePets < ActiveRecord::Migration[5.2]
  def change
    create_table :pets, id: :uuid, default: "uuid_generate_v4()" do |t|
      t.string :name
      t.string :breed
      t.string :instagram
      t.string :birthdate
      t.boolean :missing
      t.integer :poster_id
      t.integer :user_id

      t.timestamps
    end
  end
end
