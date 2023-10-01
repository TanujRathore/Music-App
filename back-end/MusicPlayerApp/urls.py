from django.urls import path, re_path
from MusicPlayerApp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('musiclist/<str:username>/', views.musiclistApi, name='musiclistApi'),
    path('musiclist/', views.musiclistApi),
    re_path(r'^musiclist/(?P<id>[0-9]*)$', views.musiclistApi),
    path('upload/', views.SaveFile),
    # music 
    path('music/', views.musicApi),
    re_path(r'^music/(?P<id>[0-9]*)$', views.musicApi),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
