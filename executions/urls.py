from django.urls import path
from .views import ExecutionListView, ExecutionDetailView

urlpatterns = [
  path('', ExecutionListView.as_view()),
  path('<int:pk>/', ExecutionDetailView.as_view())
]