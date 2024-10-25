package repo

import auth "learning-center-schedule-management/pkg/repositories/auth"

func InitializeModels() {
	auth.InitializeUser()
}
