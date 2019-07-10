class CreateTags < ActiveRecord::Migration[5.2]
  def change
    create_table :tags, id: :uuid, default: "uuid_generate_v4()" do |t|
      t.boolean :active

      t.timestamps
    end
  end
end
