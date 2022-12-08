from django.urls import path
from .views import SessionView, SessionDetailView

# Endpoint that hits this file: /session/
urlpatterns = [
    path('', SessionView.as_view()),
    path('<int:pk>/', SessionDetailView.as_view())
]