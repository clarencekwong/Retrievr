class AddMissingLatitudeToPets < ActiveRecord::Migration[5.2]
  def change
    add_column :pets, :missing_latitude, :string
  end
end
