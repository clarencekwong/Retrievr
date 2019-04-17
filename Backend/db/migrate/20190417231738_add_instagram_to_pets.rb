class AddInstagramToPets < ActiveRecord::Migration[5.2]
  def change
    add_column :pets, :instagram, :string
  end
end
