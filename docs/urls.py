from django.urls import path
from . import views

urlpatterns = [
    path('',           views.home,       name='home'),
    path('stats/',     views.stats_page, name='stats'),
    path('stats/api/', views.stats_api,  name='stats_api'),
]
