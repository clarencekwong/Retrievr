class AddColumnToPetsFinderPhoneNumber < ActiveRecord::Migration[5.2]
  def change
    add_column :pets, :finder_phone_number, :string
  end
end
