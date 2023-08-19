from django.urls import path, re_path
from UserAPP import views

urlpatterns = [
    path('register/', views.register_user),
    re_path(r'register/(?P<id>[0-9]*)$', views.register_user),
]
