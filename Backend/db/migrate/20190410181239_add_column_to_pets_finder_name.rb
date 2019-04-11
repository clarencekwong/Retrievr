class AddColumnToPetsFinderName < ActiveRecord::Migration[5.2]
  def change
    add_column :pets, :finder_name, :string
  end
end
