from django.urls import path, re_path
from LoginAPI import views

urlpatterns = [
    path('user/register/', views.register_user),
    re_path(r'^user/register/(?P<id>[0-9]*)$', views.register_user),
]
