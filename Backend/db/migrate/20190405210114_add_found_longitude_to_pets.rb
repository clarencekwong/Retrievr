class AddFoundLongitudeToPets < ActiveRecord::Migration[5.2]
  def change
    add_column :pets, :found_longitude, :string
  end
end
