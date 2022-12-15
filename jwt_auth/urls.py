from django.urls import path
from .views import LoginView, RegisterView, ProfileView, ProfileEditView

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('profile/', ProfileView.as_view()),
  path('profile/edit/', ProfileEditView.as_view())
]