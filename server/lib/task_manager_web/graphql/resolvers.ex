defmodule TaskMgrWeb.Graphql.Resolvers do
  alias TaskMgr.Tasks

  def tasks(_parent, _args, _res) do
    {:ok, Tasks.list_tasks()}
  end

  def create_task(_parent, args, _res) do
    Tasks.create_task(args)
  end

  def update_task(_parent, args, _res) do
    task = Tasks.get_task!(args[:id])
    Tasks.update_task(task, args)
  end

  def delete_task(_parent, args, _res) do
    task = Tasks.get_task!(args[:id])
    Tasks.delete_task(task)
  end
end
