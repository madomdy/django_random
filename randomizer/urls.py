from django.conf.urls import url

from . import views

urlpatterns = [
        url(r'^$', views.index, name = 'index'),
        url(r'(?P<query_id>[0-9]+)', views.show_query, name = 'show_query'),
        url(r'new_query', views.new_query, name = 'new_query')
        # url(r'^$', views.index, name = 'index'),
]