class CreatePets < ActiveRecord::Migration[5.2]
  def change
    create_table :pets do |t|
      t.string :name
      t.integer :age
      t.string :breed
      t.boolean :missing
      t.string :user_id
      t.string :vet_id
      t.string :image

      t.timestamps
    end
  end
end
