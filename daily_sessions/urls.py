from django.urls import path
from .views import SessionView

# Endpoint that hits this file: /session/
urlpatterns = [
    path('', SessionView.as_view())
]