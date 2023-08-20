from django.urls import path, re_path
from . import views

urlpatterns = [
    path('manage/', views.manageAPI),
    re_path(r'manage/(?P<name>[a-zA-Z]+)$', views.manageAPI),
    path('login/', views.loginAPI),
]
