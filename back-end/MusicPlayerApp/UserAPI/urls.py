from django.urls import path, re_path
from . import views

urlpatterns = [
    path('signup/', views.manageAPI),
    re_path(r'signup/(?P<name>[a-zA-Z]+)$', views.manageAPI),
]
