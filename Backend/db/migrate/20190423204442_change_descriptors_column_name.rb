class ChangeDescriptorsColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :posters, :descriptors, :pet_description
  end
end
