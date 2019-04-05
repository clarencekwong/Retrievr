class AddMissingLongitudeToPets < ActiveRecord::Migration[5.2]
  def change
    add_column :pets, :missing_longitude, :string
  end
end
