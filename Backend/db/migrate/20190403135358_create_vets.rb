class CreateVets < ActiveRecord::Migration[5.2]
  def change
    create_table :vets do |t|
      t.string :name
      t.string :phone_number
      t.string :location

      t.timestamps
    end
  end
end
