defmodule TaskMgrWeb.Graphql.Schema do
  use Absinthe.Schema
  alias TaskMgrWeb.Graphql.Resolvers

  import_types Absinthe.Type.Custom

  enum :task_status, values: [:not_started, :in_progress, :completed]

  object :task do
    field :id, :id
    field :name, :string
    field :description, :string
    field :status, :task_status
    field :due_at, :datetime
  end

  query do
    field :tasks, list_of(:task) do
      resolve {Resolvers, :tasks}
    end
  end

  mutation do
    field :create_task, type: :task do
      arg :name, non_null(:string)
      arg :status, non_null(:task_status)
      arg :due_at, non_null(:datetime)
      arg :description, :string

      resolve {Resolvers, :create_task}
    end

    field :update_task, type: :task do
      arg :id, non_null(:id)
      arg :name, :string
      arg :status, :task_status
      arg :due_at, :datetime
      arg :description, :string

      resolve {Resolvers, :update_task}
    end

    field :delete_task, type: :task do
      arg :id, non_null(:id)

      resolve {Resolvers, :delete_task}
    end
  end
end
