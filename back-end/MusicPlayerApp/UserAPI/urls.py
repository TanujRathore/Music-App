from django.urls import path, re_path
from . import views

urlpatterns = [
    path('register/', views.registeAPI),
    re_path(r'register/(?P<name>[a-zA-Z]+)$', views.registeAPI),
]
