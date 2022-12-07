from django.urls import path
from .views import TradeListView, TradeDetailView

urlpatterns = [
  path('', TradeListView.as_view()),
  path('<int:pk>/', TradeDetailView.as_view()),
]