defmodule TaskMgrWeb.Router do
  use TaskMgrWeb, :router

  forward "/graphql", Absinthe.Plug,
    schema: TaskMgrWeb.Graphql.Schema

  unless Mix.env() == :prod do
    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: TaskMgrWeb.Graphql.Schema,
      interface: :simple
  end
end
