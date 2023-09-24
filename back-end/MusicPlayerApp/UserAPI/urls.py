from django.urls import path, re_path
from . import views

urlpatterns = [
    path('manage/', views.manageAPI, name='manage-api'),
    re_path(r'manage/(?P<name>[a-zA-Z]+)$', views.manageAPI, name='manage-detail-api'),
    path('login/', views.loginAPI, name='login-api'),
]
