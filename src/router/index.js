import UsersRouter from "#root/router/users"

const setupRoutes = app => {
	app.use("/users", UsersRouter)
}

export default setupRoutes;
