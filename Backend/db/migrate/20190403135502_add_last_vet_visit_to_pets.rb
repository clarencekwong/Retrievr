class AddLastVetVisitToPets < ActiveRecord::Migration[5.2]
  def change
    add_column :pets, :last_vet_visit, :datetime
  end
end
