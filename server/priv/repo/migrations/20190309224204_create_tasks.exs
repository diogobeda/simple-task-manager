defmodule TaskMgr.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    TaskStatusEnum.create_type()

    create table(:tasks, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :description, :text
      add :due_at, :utc_datetime
      add :status, TaskStatusEnum.type()

      timestamps()
    end

  end
end
