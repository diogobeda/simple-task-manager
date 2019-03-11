defmodule TaskMgr.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "tasks" do
    field :description, :string
    field :due_at, :utc_datetime
    field :name, :string
    field :status, TaskStatusEnum

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :description, :due_at, :status])
    |> validate_required([:name, :due_at, :status])
  end
end
