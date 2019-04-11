class AddFoundLatitudeToPets < ActiveRecord::Migration[5.2]
  def change
    add_column :pets, :found_latitude, :string
  end
end
