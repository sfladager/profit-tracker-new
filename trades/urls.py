from django.urls import path
from .views import TradeListView, TradeDetailView, TradeFormView

urlpatterns = [
  path('', TradeListView.as_view()),
  path('form/', TradeFormView.as_view()),
  path('<int:pk>/', TradeDetailView.as_view()),
]