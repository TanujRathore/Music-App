from django.urls import path, re_path
from MusicPlayerApp import views

urlpatterns = [
    path('employee/', views.employeeApi),
    re_path(r'^employee/(?P<id>[0-9]*)$', views.employeeApi),
]
